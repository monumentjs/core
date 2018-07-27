import {ChildProcess} from './ChildProcess';
import {ProcessClosedEventArgs} from './ProcessClosedEventArgs';
import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {EventArgs} from '@monument/core/main/events/EventArgs';
import {ArrayList} from '@monument/core/main/collection/mutable/ArrayList';
import {Event} from '@monument/core/main/events/Event';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {ProcessMessage} from './ProcessMessage';


export abstract class ProcessPool<TMessage> implements ChildProcess<TMessage> {
    private readonly _messageReceived: ConfigurableEvent<ChildProcess<TMessage>, ProcessMessageReceivedEventArgs<TMessage>> = new ConfigurableEvent();
    private readonly _disconnected: ConfigurableEvent<ChildProcess<TMessage>, EventArgs> = new ConfigurableEvent();
    private readonly _exited: ConfigurableEvent<ChildProcess<TMessage>, ProcessExitedEventArgs> = new ConfigurableEvent();
    private readonly _closed: ConfigurableEvent<ChildProcess<TMessage>, ProcessClosedEventArgs> = new ConfigurableEvent();

    private readonly _size: number;
    private readonly _processes: ArrayList<ChildProcess<TMessage>> = new ArrayList();


    public get size(): number {
        return this._size;
    }


    public get messageReceived(): Event<ChildProcess<TMessage>, ProcessMessageReceivedEventArgs<TMessage>> {
        return this._messageReceived;
    }


    public get exited(): Event<ChildProcess<TMessage>, ProcessExitedEventArgs> {
        return this._exited;
    }


    public get closed(): Event<ChildProcess<TMessage>, ProcessClosedEventArgs> {
        return this._closed;
    }


    public get disconnected(): Event<ChildProcess<TMessage>, EventArgs> {
        return this._disconnected;
    }


    public get isKilled(): boolean {
        return this._processes.all((process) => {
            return process.isKilled;
        });
    }


    protected constructor(size: number) {
        this._size = size;
    }


    public kill(signal?: NodeJS.Signals): void {
        this._processes.forEach((process) => {
            process.kill(signal);
        });
    }


    public async sendMessage(message: ProcessMessage<TMessage>): Promise<void> {
        const process: ChildProcess<TMessage> = this._processes.getAt(0);

        return process.sendMessage(message);
    }


    /**
     * Creates processes pool of specified capacity.
     * This method must be called in constructor after all properties set.
     */
    protected initialize() {
        for (let id = 0; id < this._size; id++) {
            this._processes.add(this.getProcess(id));
        }
    }


    protected abstract createProcess(id: number): ChildProcess<TMessage>;


    private getProcess(id: number): ChildProcess<TMessage> {
        const process: ChildProcess<TMessage> = this.createProcess(id);

        process.messageReceived.subscribe(this.handleMessageReceived);
        process.disconnected.subscribe(this.handleDisconnected);
        process.closed.subscribe(this.handleClosed);
        process.exited.subscribe(this.handleExited);

        return process;
    }


    @Delegate
    private handleMessageReceived(target: ChildProcess<TMessage>, args: ProcessMessageReceivedEventArgs<TMessage>) {
        this._messageReceived.trigger(target, args);
    }


    @Delegate
    private handleDisconnected(target: ChildProcess<TMessage>, args: EventArgs) {
        this._disconnected.trigger(target, args);
    }


    @Delegate
    private handleClosed(target: ChildProcess<TMessage>, args: ProcessClosedEventArgs) {
        this._closed.trigger(target, args);
    }


    @Delegate
    private handleExited(target: ChildProcess<TMessage>, args: ProcessExitedEventArgs) {
        this._exited.trigger(target, args);
    }
}
