import {Delegate} from '@monument/core/main/decorators/Delegate';
import {RepeatableNumberGenerator} from '@monument/core/main/data/generator/RepeatableNumberGenerator';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {ChildProcess} from './ChildProcess';
import {ProcessMessage} from './ProcessMessage';
import {ProcessClosedEventArgs} from './ProcessClosedEventArgs';
import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';


export abstract class ProcessPool implements ChildProcess {
    private readonly _messageReceived: ConfigurableEvent<this, ProcessMessageReceivedEventArgs> = new ConfigurableEvent(this);
    private readonly _disconnected: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent(this);
    private readonly _exited: ConfigurableEvent<this, ProcessExitedEventArgs> = new ConfigurableEvent(this);
    private readonly _closed: ConfigurableEvent<this, ProcessClosedEventArgs> = new ConfigurableEvent(this);

    private readonly _capacity: number;
    private readonly _processes: ArrayList<ChildProcess> = new ArrayList();
    private readonly _indexGenerator: RepeatableNumberGenerator;


    public get messageReceived(): Event<ChildProcess, ProcessMessageReceivedEventArgs> {
        return this._messageReceived;
    }


    public get exited(): Event<ChildProcess, ProcessExitedEventArgs> {
        return this._exited;
    }


    public get closed(): Event<ChildProcess, ProcessClosedEventArgs> {
        return this._closed;
    }


    public get disconnected(): Event<ChildProcess, EventArgs> {
        return this._disconnected;
    }


    public get isKilled(): boolean {
        return this._processes.all((process) => {
            return process.isKilled;
        });
    }


    protected constructor(capacity: number) {
        this._capacity = capacity;
        this._indexGenerator = new RepeatableNumberGenerator(capacity);
    }


    public kill(signal?: NodeJS.Signals): void {
        this._processes.forEach((process) => {
            process.kill(signal);
        });
    }


    public send(message: ProcessMessage): Promise<void> {
        const index: number = this._indexGenerator.next();
        const process: ChildProcess = this._processes.getAt(index);

        return process.send(message);
    }


    protected abstract createProcess(id: number): ChildProcess;


    /**
     * Creates processes pool of specified capacity.
     * This method must be called in constructor after all properties set.
     */
    protected initialize() {
        for (let id = 0; id < this._capacity; id++) {
            this._processes.add(this.getProcess(id));
        }
    }


    private getProcess(id: number): ChildProcess {
        const process: ChildProcess = this.createProcess(id);

        process.messageReceived.subscribe(this.onMessageReceived);
        process.disconnected.subscribe(this.onDisconnected);
        process.closed.subscribe(this.onClosed);
        process.exited.subscribe(this.onExited);

        return process;
    }


    @Delegate
    private onMessageReceived(target: ChildProcess, args: ProcessMessageReceivedEventArgs) {
        this._messageReceived.dispatch(args);
    }


    @Delegate
    private onDisconnected(target: ChildProcess, args: EventArgs) {
        this._disconnected.dispatch(args);
    }


    @Delegate
    private onClosed(target: ChildProcess, args: ProcessClosedEventArgs) {
        this._closed.dispatch(args);
    }


    @Delegate
    private onExited(target: ChildProcess, args: ProcessExitedEventArgs) {
        this._exited.dispatch(args);
    }
}
