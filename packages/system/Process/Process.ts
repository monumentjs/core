import * as net from 'net';
import {Readable, Writable} from 'stream';
import {ChildProcess as NodeChildProcess, spawn, SpawnOptions} from 'child_process';
import {NoAssociatedProcessException} from './NoAssociatedProcessException';
import {ProcessEventArgs} from './ProcessEventArgs';
import {ProcessStartInfo} from './ProcessStartInfo';
import {ProcessMessageEventArgs} from './ProcessMessageEventArgs';
import {ProcessIOMode} from './ProcessIOMode';
import {ProcessMessage} from './ProcessMessage';
import {StandardInputStream} from './StandardInputStream';
import {StandardOutputStream} from './StandardOutputStream';
import {StandardErrorStream} from './StandardErrorStream';
import {DeferredObject} from '../../async/main/DeferredObject';
import {InvalidOperationException} from '../../core/main/exceptions/InvalidOperationException';
import {ErrorEventArgs} from '@monument/core/Events/ErrorEventArgs';
import {EventDispatcher} from '@monument/core/Events/EventDispatcher';
import {EventSource} from '@monument/core/Events/EventSource';
import {Delegate} from '@monument/core/Events/Decorators/Delegate';
import {AbstractComponent} from '../../component-model/main/component/AbstractComponent';


export class Process extends AbstractComponent {
    /**
     * @throws {ArgumentNullException} If 'path' argument is not defined.
     * @throws {ArgumentNullException} If 'args' argument is not defined.
     */
    public static start(fileName: string, ...args: string[]): Process {
        let process: Process = new Process(new ProcessStartInfo(fileName, ...args));

        process.start();

        return process;
    }


    public static run(fileName: string, ...args: string[]): Promise<Process> {
        let deferred: DeferredObject<Process> = new DeferredObject<Process>();
        let process: Process = new Process(new ProcessStartInfo(fileName, ...args));

        process.exited.subscribe(() => {
            deferred.resolve(process);
        });

        process.error.subscribe((target: Process, event: ErrorEventArgs) => {
            deferred.reject(event.error);
        });

        process.start();

        return deferred.promise;
    }


    private _startInfo: ProcessStartInfo;
    private _nativeProcess: NodeChildProcess;
    private _terminationSignal: string | undefined = undefined;
    private _exitCode: number | undefined = undefined;
    private _hasExited: boolean = false;
    private _isDisposed: boolean = false;


    private _error: EventDispatcher<this, ErrorEventArgs> = this.createEventDispatcher();
    private _started: EventDispatcher<this, ProcessEventArgs> = this.createEventDispatcher();
    private _exited: EventDispatcher<this, ProcessEventArgs> = this.createEventDispatcher();
    private _closed: EventDispatcher<this, ProcessEventArgs> = this.createEventDispatcher();
    private _terminated: EventDispatcher<this, ProcessEventArgs> = this.createEventDispatcher();
    private _disconnected: EventDispatcher<this, ProcessEventArgs> = this.createEventDispatcher();
    private _messageReceived: EventDispatcher<this, ProcessEventArgs> = this.createEventDispatcher();


    public readonly error: EventSource<this, ErrorEventArgs> = this._error;
    public readonly started: EventSource<this, ProcessEventArgs> = this._started;
    public readonly exited: EventSource<this, ProcessEventArgs> = this._exited;
    public readonly closed: EventSource<this, ProcessEventArgs> = this._closed;
    public readonly terminated: EventSource<this, ProcessEventArgs> = this._terminated;
    public readonly disconnected: EventSource<this, ProcessEventArgs> = this._disconnected;
    public readonly messageReceived: EventSource<this, ProcessEventArgs> = this._messageReceived;


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
        this._startInfo = value;
    }


    public get isConnected(): boolean {
        return this._nativeProcess && this._nativeProcess.connected;
    }


    public get hasExited(): boolean {
        this.throwIfNoAssociatedProcess();

        return this._hasExited;
    }


    public get exitCode(): number | undefined {
        this.throwIfNoAssociatedProcess();

        return this._exitCode;
    }


    public get terminationSignal(): string | undefined {
        this.throwIfNoAssociatedProcess();

        return this._terminationSignal;
    }


    public get standardInput(): StandardInputStream {
        this.throwIfNoAssociatedProcess();

        return new StandardInputStream(this._nativeProcess.stdin);
    }


    public constructor(startInfo: ProcessStartInfo) {
        super();

        this._startInfo = startInfo;
    }

    /**
     * @throws {InvalidOperationException} If process already running.
     */
    public start(): void {
        if (this._nativeProcess) {
            throw new InvalidOperationException(`Process already running.`);
        }

        this._nativeProcess = this.spawnProcess();

        this._nativeProcess.once('exit', this.onExit);
        this._nativeProcess.once('close', this.onClose);
        this._nativeProcess.once('disconnect', this.onDisconnect);
        this._nativeProcess.on('error', this.onError);
        this._nativeProcess.on('message', this.onMessage);

        this._started.dispatch(new ProcessEventArgs());
    }


    public sendMessage(message: ProcessMessage): Promise<void> {
        this.throwIfNoAssociatedProcess();

        let deferred: DeferredObject = new DeferredObject();

        this._nativeProcess.send(message.message, message.handle, {
            keepOpen: message.keepOpen
        }, (error: Error): void => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }

    /**
     * @throws {ArgumentNullException} If 'signal' argument is not defined.
     * @throws {NoAssociatedProcessException} If current instance does not have associated process descriptor.
     */
    public kill(signal: string = 'SIGTERM'): Promise<number> {
        this.throwIfNoAssociatedProcess();

        let deferred: DeferredObject<number> = new DeferredObject<number>();

        let onExit = (exitCode: number) => {
            deferred.resolve(exitCode);

            this._nativeProcess.removeListener('error', onError);
        };

        let onError = (error: Error) => {
            deferred.reject(error);

            this._nativeProcess.removeListener('exit', onExit);
        };

        this._nativeProcess.once('exit', onExit);
        this._nativeProcess.once('error', onError);

        this._nativeProcess.kill(signal);

        return deferred.promise;
    }


    public async disconnect(): Promise<void> {
        this.throwIfNoAssociatedProcess();

        this._nativeProcess.disconnect();
    }


    public dispose(): void {
        this._nativeProcess.removeAllListeners();
        super.dispose();
    }


    private spawnProcess(): NodeChildProcess {
        return spawn(
            this.startInfo.fileName,
            this.startInfo.commandLineArguments,
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


    private getStandardInput(): Writable | ProcessIOMode {
        let standardInput: StandardInputStream | ProcessIOMode = this.startInfo.standardInput;

        if (standardInput instanceof StandardInputStream) {
            return standardInput.baseStream;
        }

        return standardInput;
    }


    private getStandardOutput(): Readable | ProcessIOMode {
        let standardOutput: StandardOutputStream | ProcessIOMode = this.startInfo.standardOutput;

        if (standardOutput instanceof StandardOutputStream) {
            return standardOutput.baseStream;
        }

        return standardOutput;
    }


    private getStandardError(): Readable | ProcessIOMode {
        let standardError: StandardErrorStream | ProcessIOMode = this.startInfo.standardError;

        if (standardError instanceof StandardErrorStream) {
            return standardError.baseStream;
        }

        return standardError;
    }


    @Delegate
    private onDisconnect(): void {
        this._disconnected.dispatch(new ProcessEventArgs());
    }


    @Delegate
    private onClose(exitCode: number, terminationSignal: string): void {
        if (terminationSignal) {
            this.onNativeProcessTerminate(terminationSignal);
        } else {
            this.onNativeProcessClose(exitCode);
        }
    }


    @Delegate
    private onExit(exitCode: number, terminationSignal: string): void {
        if (terminationSignal) {
            this.onNativeProcessTerminate(terminationSignal);
        } else {
            this.onNativeProcessExit(exitCode);
        }

        this._hasExited = true;
    }


    @Delegate
    private onError(error: Error): void {
        this._error.dispatch(new ErrorEventArgs(error));
    }


    @Delegate
    private onMessage(payload: object | number | string, handle: net.Socket | net.Server | undefined): void {
        let message: ProcessMessage = new ProcessMessage(payload);

        message.handle = handle;

        this._messageReceived.dispatch(new ProcessMessageEventArgs(message));
    }


    private onNativeProcessExit(exitCode: number): void {
        if (this._exitCode == null) {
            this._exitCode = exitCode;

            this._exited.dispatch(new ProcessEventArgs());
        }
    }


    private onNativeProcessTerminate(terminationSignal: string): void {
        if (this._terminationSignal == null) {
            this._terminationSignal = terminationSignal;

            this._terminated.dispatch(new ProcessEventArgs());
        }
    }


    private onNativeProcessClose(exitCode: number): void {
        if (this._exitCode == null) {
            this._exitCode = exitCode;

            this._closed.dispatch(new ProcessEventArgs());
        }
    }


    private throwIfNoAssociatedProcess(): void {
        if (!this._nativeProcess) {
            throw new NoAssociatedProcessException(this);
        }
    }
}
