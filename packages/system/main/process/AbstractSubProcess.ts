import {ChildProcess} from 'child_process';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Event} from '@monument/events/main/Event';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {Delegate} from '@monument/events/main/decorators/Delegate';
import {ProcessMessage} from './communication/ProcessMessage';
import {ProcessMessageType} from './communication/ProcessMessageType';
import {ProcessMessageMessage} from './communication/ProcessMessageMessage';
import {SubProcess} from './SubProcess';
import {ProcessInfo} from './ProcessInfo';
import {ProcessException} from './ProcessException';
import Signals = NodeJS.Signals;


export abstract class AbstractSubProcess<TMessage> implements SubProcess<TMessage> {
    private readonly _process: ChildProcess;
    private readonly _messageReceived: ConfigurableEvent<this, TMessage> = new ConfigurableEvent(this);
    private readonly _processInfoRequests: ArrayList<DeferredObject<ProcessInfo>> = new ArrayList();
    private readonly _exitRequests: ArrayList<DeferredObject<void>> = new ArrayList();


    public get isKilled(): boolean {
        return this._process.killed;
    }


    public get messageReceived(): Event<this, TMessage> {
        return this._messageReceived;
    }


    public get info(): Promise<ProcessInfo> {
        return this.getInfo();
    }


    protected constructor(process: ChildProcess) {
        this._process = process;

        this._process.on('message', this.onProcessMessage);
        this._process.on('exit', this.onExit);
    }


    public send(message: TMessage): Promise<void> {
        return this.sendMessageMessage(message);
    }


    public kill(signal?: Signals): void {
        this._process.kill(signal);
    }


    public async exit(exitCode?: number): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._exitRequests.add(deferred);

        await this.sendExitMessage(exitCode);

        return deferred.promise;
    }


    @Delegate
    private onProcessMessage(processMessage: ProcessMessage<TMessage>) {
        switch (processMessage.type) {
            case ProcessMessageType.MESSAGE:
                this.onMessageMessage(processMessage.message);
                break;

            case ProcessMessageType.INFO_RESPONSE:
                this.onInfoResponseMessage(processMessage.info);
                break;

            default:
        }
    }


    private onMessageMessage(message: TMessage): void {
        this._messageReceived.dispatch(message);
    }


    private onInfoResponseMessage(info: ProcessInfo): void {
        for (const deferred of this._processInfoRequests) {
            deferred.resolve(info);
        }

        this._processInfoRequests.clear();
    }


    @Delegate
    private onExit() {
        for (const deferred of this._exitRequests) {
            deferred.resolve();
        }

        this._exitRequests.clear();
    }


    private async getInfo(): Promise<ProcessInfo> {
        const deferred: DeferredObject<ProcessInfo> = new DeferredObject();

        this._processInfoRequests.add(deferred);

        await this.sendInfoRequestMessage();

        return deferred.promise;
    }


    private sendInfoRequestMessage(): Promise<void> {
        return this.sendProcessMessage({
            type: ProcessMessageType.INFO_REQUEST
        });
    }


    private sendExitMessage(exitCode?: number): Promise<void> {
        return this.sendProcessMessage({
            type: ProcessMessageType.EXIT,
            exitCode: exitCode
        });
    }


    private sendMessageMessage(message: TMessage): Promise<void> {
        const processMessage: ProcessMessageMessage<TMessage> = {
            type: ProcessMessageType.MESSAGE,
            message: message
        };

        return this.sendProcessMessage(processMessage);
    }


    private sendProcessMessage(processMessage: ProcessMessage<TMessage>): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._process.send(processMessage, (error: Error) => {
            if (error == null) {
                deferred.resolve();
            } else {
                deferred.reject(new ProcessException(error.message));
            }
        });

        return deferred.promise;
    }
}
