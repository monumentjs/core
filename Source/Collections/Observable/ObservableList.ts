import {EventBindings} from '../../Events/EventBindings';
import {EventBinding} from '../../Events/EventBinding';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {EventSource} from '../../Events/EventSource';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {IteratorFunction} from '../IteratorFunction';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';
import {EqualityComparator} from '../../Core/EqualityComparator';
import {List} from '../List';
import {INotifyCollectionChanged} from './INotifyCollectionChanged';


export class ObservableList<T> extends List<T> implements IDisposable, INotifyCollectionChanged<T> {
    private readonly _eventBindings: EventBindings<this> = new EventBindings(this);

    protected readonly _onCollectionChanged: EventBinding<this, CollectionChangedEventArgs> = this._eventBindings.create();


    public get onCollectionChanged(): EventSource<this, CollectionChangedEventArgs> {
        return this._onCollectionChanged;
    }


    public clone(): ObservableList<T> {
        return new ObservableList(this);
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


    public insert(index: number, item: T): boolean {
        if (super.insert(index, item)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public insertAll(index: number, items: IEnumerable<T>): boolean {
        if (super.insertAll(index, items)) {
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


    public removeAt(index: number): T {
        const oldLength: number = this.length;
        const removedItem = super.removeAt(index);

        if (this.length !== oldLength) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());
        }

        return removedItem;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        if (super.removeBy(predicate)) {
            this._onCollectionChanged.dispatch(new CollectionChangedEventArgs());

            return true;
        }

        return false;
    }


    public retainAll(
        otherItems: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        if (super.retainAll(otherItems, comparator)) {
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
