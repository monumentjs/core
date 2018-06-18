import {Disposable} from '../../Disposable';
import {Subscriber} from '../Subscriber';
import {Publisher} from '../Publisher';
import {ListSet} from '../../collections/ListSet';


export class DefaultPublisher<T> implements Publisher<T>, Disposable {
    private readonly _subscribers: ListSet<Subscriber<T>> = new ListSet();


    public attach(subscriber: Subscriber<T>): boolean {
        return this._subscribers.add(subscriber);
    }


    public detach(subscriber: Subscriber<T>): boolean {
        return this._subscribers.remove(subscriber);
    }


    public notify(value: T): void {
        for (const subscriber of this._subscribers) {
            subscriber.update(value);
        }
    }


    public dispose(): void {
        this._subscribers.clear();
    }
}
