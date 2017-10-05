import {EventBinding} from '../../Events/EventBinding';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {EventSource} from '../../Events/EventSource';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {IteratorFunction} from '../IteratorFunction';
import {IEqualityComparator} from '../../Core/Abstraction/IEqualityComparator';
import {EqualityComparator} from '../../Core/EqualityComparator';
import {List} from '../List';
import {INotifyCollectionChanged} from './INotifyCollectionChanged';


export class ObservableList<T> extends List<T> implements INotifyCollectionChanged<T, ObservableList<T>> {
    protected readonly _collectionChanged: EventBinding<this, CollectionChangedEventArgs> = this._eventBindings.create();


    public get collectionChanged(): EventSource<this, CollectionChangedEventArgs> {
        return this._collectionChanged;
    }


    public clone(): ObservableList<T> {
        return new ObservableList(this);
    }


    public add(item: T): boolean {
        if (super.add(item)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public addAll(items: IEnumerable<T>): boolean {
        if (super.addAll(items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public insert(index: number, item: T): boolean {
        if (super.insert(index, item)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public insertAll(index: number, items: IEnumerable<T>): boolean {
        if (super.insertAll(index, items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public remove(item: T): boolean {
        if (super.remove(item)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public removeAll(items: IEnumerable<T>): boolean {
        if (super.removeAll(items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public removeAt(index: number): T {
        const oldLength: number = this.length;
        const removedItem = super.removeAt(index);

        if (this.length !== oldLength) {
            this.onCollectionChanged();
        }

        return removedItem;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        if (super.removeBy(predicate)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public retainAll(
        otherItems: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        if (super.retainAll(otherItems, comparator)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public clear(): boolean {
        if (super.clear()) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    private onCollectionChanged() {
        this._collectionChanged.dispatch(new CollectionChangedEventArgs());
    }
}
