import {IStateReceiver} from './IStateReceiver';
import {IStatePatch} from './IStatePatch';
import {ReceiverSupport} from '../Support/DataFlow/ReceiverSupport';
import {IEnumerable} from '../Collections/Abstraction/IEnumerable';


export abstract class StateContainer<TState> extends ReceiverSupport<IStateReceiver<TState>> {
    private _state: TState;


    public get state(): TState {
        return this._state;
    }


    public constructor() {
        super();

        this._state = this.getInitialState();
    }


    public commit(patch?: IStatePatch<TState>): void {
        if (patch != null) {
            patch.apply(this.state);
        }

        this.pushState();
    }


    public commitAll(patches: IEnumerable<IStatePatch<TState>>): void {
        for (let patch of patches) {
            patch.apply(this.state);
        }

        this.pushState();
    }


    public addReceiver(receiver: IStateReceiver<TState>): void {
        super.addReceiver(receiver);

        receiver.receiveState(this.state);
    }


    public resetState(): void {
        this._state = this.getInitialState();
    }


    protected abstract getInitialState(): TState;


    private pushState(): void {
        for (let receiver of this.receivers) {
            receiver.receiveState(this.state);
        }
    }
}
