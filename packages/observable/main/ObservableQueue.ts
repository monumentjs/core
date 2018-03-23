import {Disposable} from '@monument/core/main/Disposable';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {NullSafeEqualityComparator} from '@monument/core/main/NullSafeEqualityComparator';
import {IteratorFunction} from '@monument/collections-core/main/IteratorFunction';
import {Enumerable} from '@monument/collections-core/main/Enumerable';
import {ListQueue} from '@monument/collections/main/ListQueue';
import {EventDispatcher} from '@monument/events-core/main/EventDispatcher';
import {EventDispatcherFactory} from '@monument/events-core/main/EventDispatcherFactory';
import {EventSource} from '@monument/events-core/main/EventSource';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {NotifyCollectionChanged} from './NotifyCollectionChanged';


export class ObservableQueue<T> extends ListQueue<T> implements Disposable, NotifyCollectionChanged<T, ObservableQueue<T>> {
    private readonly _eventBuilder: EventDispatcherFactory<this> = new EventDispatcherFactory(this);

    private readonly _collectionChanged: EventDispatcher<this, CollectionChangedEventArgs> = this._eventBuilder.create();


    public get collectionChanged(): EventSource<this, CollectionChangedEventArgs> {
        return this._collectionChanged;
    }


    public clone(): ObservableQueue<T> {
        return new ObservableQueue(this);
    }


    public add(item: T): boolean {
        if (super.add(item)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public addAll(items: Enumerable<T>): boolean {
        if (super.addAll(items)) {
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


    public removeAll(items: Enumerable<T>): boolean {
        if (super.removeAll(items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        if (super.removeBy(predicate)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public retainAll(
        otherItems: Enumerable<T>,
        comparator: EqualityComparator<T> = NullSafeEqualityComparator.instance
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


    public pop(): T {
        const poppedItem: T = super.pop();

        this.onCollectionChanged();

        return poppedItem;
    }


    public dispose(): void {
        this._eventBuilder.dispose();
    }


    protected onCollectionChanged() {
        this._collectionChanged.dispatch(new CollectionChangedEventArgs());
    }
}
