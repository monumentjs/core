import {IStateReceiver} from './IStateReceiver';
import {Collection} from '../Collections/Collection';
import {Assert} from '../Assertion/Assert';


export abstract class StateContainer<TState, TAction> {
    private _receivers: Collection<IStateReceiver<TState>> = new Collection();
    private _state: TState;


    public get state(): TState {
        return this._state;
    }


    public constructor() {
        this._state = this.getInitialState();
    }


    public dispatch(action: TAction): void {
        Assert.argument('action', action).notNull();

        this.processAction(action);
        this.broadcastState();
    }


    public addReceiver(receiver: IStateReceiver<TState>): void {
        Assert.argument('receiver', receiver).notNull();

        this._receivers.add(receiver);

        receiver.receiveState(this.state);
    }


    public removeReceiver(receiver: IStateReceiver<TState>): boolean {
        Assert.argument('receiver', receiver).notNull();

        return this._receivers.remove(receiver);
    }


    public removeAllReceivers(): void {
        this._receivers.clear();
    }


    public resetState(): void {
        this._state = this.getInitialState();

        this.broadcastState();
    }


    public reset(): void {
        this.resetState();
        this.removeAllReceivers();
    }


    protected abstract getInitialState(): TState;
    protected abstract processAction(action: TAction): void;


    private broadcastState(): void {
        for (let receiver of this._receivers) {
            receiver.receiveState(this.state);
        }
    }
}
