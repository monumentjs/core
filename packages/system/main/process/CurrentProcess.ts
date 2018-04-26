import {GetInstance} from '@monument/core/main/decorators/GetInstance';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {Event} from '@monument/events/main/Event';
import {ProcessMessage} from './communication/ProcessMessage';
import {ProcessMessageType} from './communication/ProcessMessageType';
import {Process} from './Process';
import {ProcessInfo} from './ProcessInfo';
import {ProcessException} from './ProcessException';
import {DeferredObject} from '@monument/async/main/DeferredObject';


export class CurrentProcess implements Process<any> {
    @GetInstance()
    public static readonly instance: CurrentProcess;

    private readonly _process: NodeJS.Process = process;
    private readonly _messageReceived: ConfigurableEvent<CurrentProcess, any> = new ConfigurableEvent(this);

    public get messageReceived(): Event<CurrentProcess, any> {
        return this._messageReceived;
    }


    public get info(): Promise<ProcessInfo> {
        return Promise.resolve(this.getInfo());
    }


    protected constructor() {
        this._process.on('message', (processMessage: ProcessMessage<any>) => {
            switch (processMessage.type) {
                case ProcessMessageType.INFO_REQUEST:
                    this.onInfoRequestMessage();
                    break;

                case ProcessMessageType.EXIT:
                    this.onExitMessage(processMessage.exitCode);
                    break;

                case ProcessMessageType.MESSAGE:
                    this.onMessageMessage(processMessage.message);
                    break;

                default:
            }
        });
    }


    public send(message: any): Promise<void> {
        return this.sendMessageMessage(message);
    }


    public async exit(exitCode?: number): Promise<void> {
        this._process.exit(exitCode);
    }


    private onMessageMessage(message: any): void {
        this._messageReceived.dispatch(message);
    }


    private onExitMessage(exitCode?: number): void {
        this._process.exit(exitCode);
    }


    private onInfoRequestMessage(): void {
        this.sendInfoResponseMessage();
    }


    private sendInfoResponseMessage(): Promise<void> {
        return this.sendProcessMessage({
            type: ProcessMessageType.INFO_RESPONSE,
            info: this.getInfo()
        });
    }


    private sendMessageMessage(message: any): Promise<void> {
        return this.sendProcessMessage({
            type: ProcessMessageType.MESSAGE,
            message: message
        });
    }


    private sendProcessMessage(processMessage: ProcessMessage<any>): Promise<void> {
        const deferred = new DeferredObject();

        if (this._process.send != null) {
            this._process.send(processMessage, (error: Error) => {
                if (error == null) {
                    deferred.resolve();
                } else {
                    deferred.reject(error);
                }
            });
        } else {
            deferred.reject(
                new ProcessException(
                    'Unable to send message to master process: inter-process communication (IPC) is not enabled.'
                )
            );
        }

        return deferred.promise;
    }


    private getInfo(): ProcessInfo {
        return {
            processId: this._process.pid,
            parentProcessId: this._process.ppid,
            currentWorkingDirectory: this._process.cwd(),
            userId: this._process.getuid ? this._process.getuid() : undefined,
            groupId: this._process.getgid ? this._process.getgid() : undefined
        };
    }
}
