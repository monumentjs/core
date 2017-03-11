import {ChildProcess as NodeChildProcess, spawn} from 'child_process';
import {AsyncResult} from '../../Core/types';
import ProcessEvent from './ProcessEvent';
import {ProcessEventType} from './ProcessEvent';
import ProcessStartInfo from './ProcessStartInfo';
import Component from '../ComponentModel/Component';
import NoAssociatedProcessException from './Exceptions/NoAssociatedProcessException';


export default class Process extends Component {
    public static start(fileName: string, args: string[] = []): Process {
        let process: Process = new Process(new ProcessStartInfo(fileName, args));

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
        
        this._startInfo = startInfo;
    }


    // PUBLIC METHODS


    public start(): void {
        this.createNativeProcess();
        this.proxyNativeEvents();
    }
    
    
    public kill(signal: string): void {
        this.throwIfNoAssociatedProcess();
        
        this._nativeProcess.kill(signal);
    }

    
    public async dispose(): AsyncResult<void> {
        await this.kill('SIGTERM');
    }


    // PROTECTED METHODS
    
    
    protected notify(eventType: ProcessEventType): void {
        let event: ProcessEvent = new ProcessEvent(eventType, this);
        
        this.dispatchEvent(event);
    }


    // PRIVATE METHODS
    
    
    private createNativeProcess(): void {
        let {
            fileName, commandLineArguments, workingDirectory,
            isDetached, environment,
            shellName, useShellExecute,
            ownerUserId, ownerGroupId
        } = this._startInfo;
        
        this._nativeProcess = spawn(fileName, commandLineArguments, {
            cwd: workingDirectory,
            detached: isDetached,
            env: environment,
            shell: (shellName && useShellExecute) ? shellName : useShellExecute,
            uid: ownerUserId,
            gid: ownerGroupId,
            stdio: 'inherit'
        });
    }
    
    
    private proxyNativeEvents(): void {
        this._nativeProcess.on('exit', (exitCode: number, terminationSignal: string): void => {
            if (terminationSignal) {
                this.onNativeProcessTerminate(terminationSignal);
            } else {
                this.onNativeProcessExit(exitCode);
            }
        });
        
        this._nativeProcess.on('close', (exitCode: number, terminationSignal: string): void => {
            if (terminationSignal) {
                this.onNativeProcessTerminate(terminationSignal);
            } else {
                this.onNativeProcessClose(exitCode);
            }
        });
    }
    
    
    private onNativeProcessExit(exitCode: number): void {
        this._exitCode = exitCode;
    
        this.notify(ProcessEvent.EXIT);
    }
    
    
    private onNativeProcessTerminate(terminationSignal: string): void {
        this._terminationSignal = terminationSignal;
        
        this.notify(ProcessEvent.TERMINATE);
    }
    
    
    private onNativeProcessClose(exitCode: number): void {
        this._exitCode = exitCode;

        this.notify(ProcessEvent.CLOSE);
    }
    
    
    private throwIfNoAssociatedProcess(): void {
        if (!this._nativeProcess) {
            throw new NoAssociatedProcessException(this);
        }
    }
}
