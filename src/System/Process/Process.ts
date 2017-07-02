import {Readable, Writable} from 'stream';
import {ChildProcess as NodeChildProcess, spawn, SpawnOptions} from 'child_process';
import {Assert} from '../../Core/Assertion/Assert';
import {ErrorEvent} from '../../Core/Events/ErrorEvent';
import {InvalidOperationException} from '../../Core/Exceptions/InvalidOperationException';
import {IDisposable} from '../../Core/types';
import {Event} from '../../Core/Events/Event';
import {NoAssociatedProcessException} from './NoAssociatedProcessException';
import {ProcessEvent, ProcessEventType} from './ProcessEvent';
import {ProcessStartInfo} from './ProcessStartInfo';
import {ProcessMessageEvent} from './ProcessMessageEvent';
import {InvalidArgumentException} from '../../Core/Exceptions/InvalidArgumentException';
import {ProcessIOMode} from './types';
import {EventEmitter} from '../../Core/Events/EventEmitter';
import {Arguments} from './Arguments/Arguments';
import {IStreamAdapter} from '../Stream/IStreamAdapter';


export class Process extends EventEmitter implements IDisposable {

    public static getCurrentProcessArguments(): Arguments {
        let safeSegments: string[] = process.argv.map((segment: string): string => {
            if (segment.includes(' ')) {
                return `"${segment}"`;
            }

            return segment;
        });

        let args: string = safeSegments.join(' ');

        return Arguments.parse(args);
    }

    /**
     *
     * @throws {ArgumentNullException} If 'fileName' argument is not defined.
     * @throws {ArgumentNullException} If 'args' argument is not defined.
     */
    public static start(fileName: string, ...args: string[]): Process {
        Assert.argument('fileName', fileName).notNull();
        Assert.argument('args', args).notNull();

        let process: Process = new Process(new ProcessStartInfo(fileName, ...args));

        process.start();

        return process;
    }
    
    
    private _startInfo: ProcessStartInfo;
    private _nativeProcess: NodeChildProcess;
    private _terminationSignal: string = undefined;
    private _exitCode: number = undefined;
    private _isDisposed: boolean = false;


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public get id(): number {
        this.throwIfNoAssociatedProcess();
        
        return this._nativeProcess.pid;
    }
    

    public get startInfo(): ProcessStartInfo {
        return this._startInfo;
    }
    
    
    public set startInfo(value: ProcessStartInfo) {
        Assert.argument('value', value).notNull();

        this._startInfo = value;
    }
    
    
    public get isConnected(): boolean {
        this.throwIfNoAssociatedProcess();
    
        return this._nativeProcess.connected;
    }
    
    
    public get exitCode(): number {
        this.throwIfNoAssociatedProcess();
    
        return this._exitCode;
    }
    
    
    public get terminationSignal(): string {
        this.throwIfNoAssociatedProcess();
    
        return this._terminationSignal;
    }
    
    
    public constructor(startInfo: ProcessStartInfo) {
        super();

        Assert.argument('startInfo', startInfo).notNull();

        this._startInfo = startInfo;
    }

    /**
     * @throws {InvalidOperationException} If process already running.
     */
    public start(): void {
        if (this._nativeProcess) {
            throw new InvalidOperationException(`Process already running.`);
        }

        this.notify(ProcessEvent.START);

        this.spawnProcess();
        this.addEventProxies();
    }

    /**
     *
     * @throws {ArgumentNullException} If 'signal' argument is not defined.
     * @throws {NoAssociatedProcessException} If current instance does not have associated process descriptor.
     */
    public kill(signal: string = 'SIGTERM'): void {
        Assert.argument('signal', signal).notNull();
        this.throwIfNoAssociatedProcess();

        this._nativeProcess.kill(signal);
    }


    public async disconnect(): Promise<void> {
        this.throwIfNoAssociatedProcess();

        this._nativeProcess.disconnect();
    }


    public async dispose(): Promise<void> {
        await this.kill();

        this._isDisposed = true;

        this.dispatchEvent(new Event('disposed'));
    }

    /**
     * @inheritDoc
     */
    protected notify(eventType: ProcessEventType): void {
        let event: ProcessEvent = new ProcessEvent(eventType, this);

        this.dispatchEvent(event);
    }


    private spawnProcess(): void {
        let startInfo: ProcessStartInfo = this.startInfo;
        
        this._nativeProcess = spawn(
            startInfo.fileName,
            startInfo.commandLineArguments,
            this.getSpawnCommandOptions()
        );
    }


    private getSpawnCommandOptions(): SpawnOptions {
        let startInfo: ProcessStartInfo = this.startInfo;

        return {
            cwd: startInfo.workingDirectory,
            detached: startInfo.isDetached,
            env: startInfo.environment,
            shell: (startInfo.shellName && startInfo.useShellExecute) ? startInfo.shellName : startInfo.useShellExecute,
            uid: startInfo.ownerUserId,
            gid: startInfo.ownerGroupId,
            stdio: [
                this.getStandardInput(),
                this.getStandardOutput(),
                this.getStandardError()
            ]
        };
    }


    private getStandardInput(): Readable | ProcessIOMode {
        let standardInput: IStreamAdapter<Readable> | ProcessIOMode = this.startInfo.standardInput;

        if (standardInput && typeof standardInput === 'object') {
            return (standardInput as IStreamAdapter<Readable>).baseStream;
        }

        if (typeof standardInput === 'string') {
            return standardInput || ProcessIOMode.Pipe;
        }

        throw new InvalidArgumentException(`Standard input is not valid`);
    }


    private getStandardOutput(): Writable | ProcessIOMode {
        let standardOutput: IStreamAdapter<Writable> | ProcessIOMode = this.startInfo.standardOutput;

        if (standardOutput && typeof standardOutput === 'object') {
            return (standardOutput as IStreamAdapter<Writable>).baseStream;
        }

        if (typeof standardOutput === 'string') {
            return standardOutput || ProcessIOMode.Pipe;
        }

        throw new InvalidArgumentException(`Standard output is not valid`);

    }


    private getStandardError(): Writable | ProcessIOMode {
        let standardError: IStreamAdapter<Writable> | ProcessIOMode = this.startInfo.standardError;

        if (standardError && typeof standardError === 'object') {
            return (standardError as IStreamAdapter<Writable>).baseStream;
        }

        if (typeof standardError === 'string') {
            return standardError || ProcessIOMode.Pipe;
        }

        throw new InvalidArgumentException(`Standard error input is not valid`);
    }

    
    private addEventProxies(): void {
        this.addExitEventProxy();
        this.addCloseEventProxy();
        this.addDisconnectedEventProxy();
        this.addErrorEventProxy();
        this.addMessageEventProxy();
    }


    private addDisconnectedEventProxy() {
        this._nativeProcess.once('disconnect', (): void => {
            this.notify(ProcessEvent.DISCONNECT);
        });
    }


    private addCloseEventProxy() {
        this._nativeProcess.once('close', (exitCode: number, terminationSignal: string): void => {
            if (terminationSignal) {
                this.onNativeProcessTerminate(terminationSignal);
            } else {
                this.onNativeProcessClose(exitCode);
            }
        });
    }


    private addExitEventProxy() {
        this._nativeProcess.once('exit', (exitCode: number, terminationSignal: string): void => {
            if (terminationSignal) {
                this.onNativeProcessTerminate(terminationSignal);
            } else {
                this.onNativeProcessExit(exitCode);
            }
        });
    }


    private addErrorEventProxy() {
        this._nativeProcess.on('error', (error: Error): void => {
            this.dispatchEvent(new ErrorEvent(error));
        });
    }


    private addMessageEventProxy() {
        this._nativeProcess.on('message', (message: object): void => {
            this.dispatchEvent(new ProcessMessageEvent(this, message));
        });
    }

    
    private onNativeProcessExit(exitCode: number): void {
        if (this._exitCode == null) {
            this._exitCode = exitCode;

            this.notify(ProcessEvent.EXIT);
        }
    }
    
    
    private onNativeProcessTerminate(terminationSignal: string): void {
        if (this._terminationSignal == null) {
            this._terminationSignal = terminationSignal;

            this.notify(ProcessEvent.TERMINATE);
        }
    }
    
    
    private onNativeProcessClose(exitCode: number): void {
        if (this._exitCode == null) {
            this._exitCode = exitCode;

            this.notify(ProcessEvent.CLOSE);
        }
    }
    
    
    private throwIfNoAssociatedProcess(): void {
        if (!this._nativeProcess) {
            throw new NoAssociatedProcessException(this);
        }
    }
}
