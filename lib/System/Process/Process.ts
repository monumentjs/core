import {ChildProcess as NodeChildProcess, spawn, SpawnOptions} from 'child_process';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import ErrorEvent from '../../Core/Events/ErrorEvent';
import InvalidOperationException from '../../Core/Exceptions/InvalidOperationException';
import {AsyncResult} from '../../Core/types';
import Component from '../ComponentModel/Component';
import NoAssociatedProcessException from './NoAssociatedProcessException';
import ProcessEvent, {ProcessEventType} from './ProcessEvent';
import ProcessStartInfo from './ProcessStartInfo';
import ProcessMessageEvent from './ProcessMessageEvent';
import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import InvalidArgumentException from '../../Core/Exceptions/InvalidArgumentException';
import ArgumentNullException from '../../Core/Exceptions/ArgumentNullException';
import {DEFAULT_STDIO_MODE, StandardIOMode} from './types';


export default class Process extends Component {
    /**
     *
     * @throws {ArgumentNullException} If 'fileName' argument is not defined.
     * @throws {ArgumentNullException} If 'args' argument is not defined.
     */
    public static start(fileName: string, ...args: string[]): Process {
        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('args', args);

        let process: Process = new Process(new ProcessStartInfo(fileName, ...args));

        process.start();

        return process;
    }
    
    
    private _startInfo: ProcessStartInfo;
    private _nativeProcess: NodeChildProcess;
    private _terminationSignal: string = undefined;
    private _exitCode: number = undefined;
    
    
    public get id(): number {
        this.throwIfNoAssociatedProcess();
        
        return this._nativeProcess.pid;
    }
    

    public get startInfo(): ProcessStartInfo {
        return this._startInfo;
    }
    
    
    public set startInfo(value: ProcessStartInfo) {
        assertArgumentNotNull('value', value);

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

        assertArgumentNotNull('startInfo', startInfo);

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
        this.proxyProcessEvents();
    }

    /**
     *
     * @throws {ArgumentNullException} If 'signal' argument is not defined.
     * @throws {NoAssociatedProcessException} If current instance does not have associated process descriptor.
     */
    public kill(signal: string = 'SIGTERM'): void {
        assertArgumentNotNull('signal', signal);
        this.throwIfNoAssociatedProcess();

        this._nativeProcess.kill(signal);
    }


    public async disconnect(): AsyncResult<void> {
        this.throwIfNoAssociatedProcess();

        this._nativeProcess.disconnect();
    }

    
    public async dispose(): AsyncResult<void> {
        await this.kill();

        super.dispose();
    }

    /**
     * @inheritDoc
     */
    protected notify(eventType: ProcessEventType): void {
        let event: ProcessEvent = new ProcessEvent(eventType, this);

        this.dispatchEvent(event);
    }


    private spawnProcess(): void {
        let startInfo: ProcessStartInfo = this._startInfo;
        
        this._nativeProcess = spawn(
            startInfo.fileName,
            startInfo.commandLineArguments,
            this.getSpawnCommandOptions()
        );
    }


    private getSpawnCommandOptions(): SpawnOptions {
        let startInfo: ProcessStartInfo = this._startInfo;

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


    private getStandardInput(): NodeJS.WritableStream | StandardIOMode {
        let standardInput: IInternalStreamProvider<any> | StandardIOMode = this._startInfo.standardInput;

        if (typeof standardInput === 'object') {
            return (standardInput as IInternalStreamProvider<any>).getInternalStream();
        }

        if (typeof standardInput === 'string') {
            return standardInput || DEFAULT_STDIO_MODE;
        }

        throw new InvalidArgumentException(`Standard input is not valid`);
    }


    private getStandardOutput(): NodeJS.ReadableStream | StandardIOMode {
        let standardOutput: IInternalStreamProvider<any> | StandardIOMode = this._startInfo.standardOutput;

        if (typeof standardOutput === 'object') {
            return (standardOutput as IInternalStreamProvider<any>).getInternalStream();
        }

        if (typeof standardOutput === 'string') {
            return standardOutput || DEFAULT_STDIO_MODE;
        }

        throw new InvalidArgumentException(`Standard output is not valid`);

    }


    private getStandardError(): NodeJS.WritableStream | StandardIOMode {
        let standardError: IInternalStreamProvider<any> | StandardIOMode = this._startInfo.standardError;

        if (typeof standardError === 'object') {
            return (standardError as IInternalStreamProvider<any>).getInternalStream();
        }

        if (typeof standardError === 'string') {
            return standardError || DEFAULT_STDIO_MODE;
        }

        throw new InvalidArgumentException(`Standard error input is not valid`);
    }

    
    private proxyProcessEvents(): void {
        this._nativeProcess.once('exit', (exitCode: number, terminationSignal: string): void => {
            if (terminationSignal) {
                this.onNativeProcessTerminate(terminationSignal);
            } else {
                this.onNativeProcessExit(exitCode);
            }
        });

        this._nativeProcess.once('close', (exitCode: number, terminationSignal: string): void => {
            if (terminationSignal) {
                this.onNativeProcessTerminate(terminationSignal);
            } else {
                this.onNativeProcessClose(exitCode);
            }
        });

        this._nativeProcess.once('disconnect', (): void => {
            this.notify(ProcessEvent.DISCONNECT);
        });

        this._nativeProcess.on('error', (error: Error): void => {
            this.dispatchEvent(new ErrorEvent(error));
        });

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
