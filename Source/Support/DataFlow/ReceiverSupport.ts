import {Set} from '../../Collections/Set';
import {IEnumerable} from '../../Collections/Abstraction/IEnumerable';


export abstract class ReceiverSupport<TReceiver> {
    private _receivers: Set<TReceiver> = new Set<TReceiver>();


    public addReceiver(receiver: TReceiver): void {
        this._receivers.add(receiver);
    }


    public removeReceiver(receiver: TReceiver): void {
        this._receivers.remove(receiver);
    }


    public hasReceiver(receiver: TReceiver): boolean {
        return this._receivers.contains(receiver);
    }


    public removeAllReceivers(): void {
        this._receivers.clear();
    }


    public getAllReceivers(): IEnumerable<TReceiver> {
        return this._receivers;
    }
}
