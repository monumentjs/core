import {EventBinding} from '../../Events/EventBinding';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {EventSource} from '../../Events/EventSource';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {IteratorFunction} from '../IteratorFunction';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';
import {EqualityComparator} from '../../Core/EqualityComparator';
import {INotifyCollectionChanged} from './INotifyCollectionChanged';
import {Stack} from '../Stack';


export class ObservableStack<T> extends Stack<T> implements IDisposable, INotifyCollectionChanged<T, ObservableStack<T>> {
    private readonly _collectionChanged: EventBinding<this, CollectionChangedEventArgs> = this._eventBindings.create();


    public get collectionChanged(): EventSource<this, CollectionChangedEventArgs> {
        return this._collectionChanged;
    }


    public clone(): ObservableStack<T> {
        return new ObservableStack(this);
    }


    public add(item: T): boolean {
        if (super.add(item)) {
            this._collectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public addAll(items: IEnumerable<T>): boolean {
        if (super.addAll(items)) {
            this._collectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public remove(item: T): boolean {
        if (super.remove(item)) {
            this._collectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public removeAll(items: IEnumerable<T>): boolean {
        if (super.removeAll(items)) {
            this._collectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        if (super.removeBy(predicate)) {
            this._collectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public retainAll(
        otherItems: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        if (super.retainAll(otherItems, comparator)) {
            this._collectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public clear(): boolean {
        if (super.clear()) {
            this._collectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public pop(): T {
        const poppedItem: T = super.pop();

        this._collectionChanged.dispatch(new CollectionChangedEventArgs());

        return poppedItem;
    }
}
