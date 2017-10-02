import {EventBindings} from '../../Events/EventBindings';
import {EventBinding} from '../../Events/EventBinding';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {EventSource} from '../../Events/EventSource';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {IteratorFunction} from '../IteratorFunction';
import {INotifyCollectionChanged} from './INotifyCollectionChanged';
import {Set} from '../Set';


export class ObservableSet<T> extends Set<T> implements IDisposable, INotifyCollectionChanged<T> {
    private readonly _eventBindings: EventBindings<this> = new EventBindings(this);

    private readonly _onCollectionChanged: EventBinding<this, CollectionChangedEventArgs> = this._eventBindings.create();


    public get onCollectionChanged(): EventSource<this, CollectionChangedEventArgs> {
        return this._onCollectionChanged;
    }


    public clone(): ObservableSet<T> {
        return new ObservableSet(this);
    }


    public add(item: T): boolean {
        if (super.add(item)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public addAll(items: IEnumerable<T>): boolean {
        if (super.addAll(items)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public intersectWith(items: IEnumerable<T>): boolean {
        if (super.intersectWith(items)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public symmetricExceptWith(items: IEnumerable<T>): boolean {
        if (super.symmetricExceptWith(items)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public remove(item: T): boolean {
        if (super.remove(item)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public removeAll(items: IEnumerable<T>): boolean {
        if (super.removeAll(items)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        if (super.removeBy(predicate)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public retainAll(otherItems: IEnumerable<T>): boolean {
        if (super.retainAll(otherItems)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public clear(): boolean {
        if (super.clear()) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public dispose(): void {
        this._eventBindings.dispose();
    }
}
