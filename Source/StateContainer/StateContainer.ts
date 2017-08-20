import {IStateReceiver} from './IStateReceiver';
import {Collection} from '../Collections/Collection';
import {Assert} from '../Assertion/Assert';
import {IStatePatch} from './IStatePatch';


export abstract class StateContainer<TState> {
    private _receivers: Collection<IStateReceiver<TState>> = new Collection();
    private _state: TState;


    public get state(): TState {
        return this._state;
    }


    public constructor() {
        this._state = this.getInitialState();
    }


    public commit(patch?: IStatePatch<TState>): void {
        if (patch != null) {
            patch.apply(this.state);
        }

        this.commitChanges();
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

        this.commitChanges();
    }


    protected abstract getInitialState(): TState;


    private commitChanges(): void {
        for (let receiver of this._receivers) {
            receiver.receiveState(this.state);
        }
    }
}
