import {IObserver} from '../../Core/Abstraction/IObserver';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {Map} from '../../Collections/Map';


export class SubscriptionCancellationToken<TState> implements IDisposable {
    private _isDisposed: boolean;


    public constructor(
        private readonly _observers: Map<IObserver<TState>, IDisposable>,
        private readonly _observer: IObserver<TState>
    ) {}


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public dispose(): void {
        this._observers.remove(this._observer);
        this._isDisposed = true;
    }
}
