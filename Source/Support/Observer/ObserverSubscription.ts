import {IObserver} from '../../Core/Abstraction/IObserver';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {Map} from '../../Collections/Map';


export class ObserverSubscription<T> implements IDisposable {

    public constructor(
        private readonly _observers: Map<IObserver<T>, IDisposable>,
        private readonly _observer: IObserver<T>
    ) {}


    public dispose(): void {
        this._observers.remove(this._observer);
    }
}
