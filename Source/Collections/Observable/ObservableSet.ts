import {EventFactory} from '../../Events/EventFactory';
import {EventDispatcher} from '../../Events/EventDispatcher';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {EventSource} from '../../Events/EventSource';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {IteratorFunction} from '../IteratorFunction';
import {INotifyCollectionChanged} from './INotifyCollectionChanged';
import {Set} from '../Set';


export class ObservableSet<T> extends Set<T> implements IDisposable, INotifyCollectionChanged<T, ObservableSet<T>> {
    private readonly _eventFactory: EventFactory<this> = new EventFactory(this);

    private readonly _collectionChanged: EventDispatcher<this, CollectionChangedEventArgs> = this._eventFactory.create();


    public readonly collectionChanged: EventSource<this, CollectionChangedEventArgs> = this._collectionChanged;


    public clone(): ObservableSet<T> {
        return new ObservableSet(this);
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


    public intersectWith(items: IEnumerable<T>): boolean {
        if (super.intersectWith(items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public symmetricExceptWith(items: IEnumerable<T>): boolean {
        if (super.symmetricExceptWith(items)) {
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


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        if (super.removeBy(predicate)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public retainAll(otherItems: IEnumerable<T>): boolean {
        if (super.retainAll(otherItems)) {
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


    public dispose(): void {
        this._eventFactory.dispose();
    }


    protected onCollectionChanged() {
        this._collectionChanged.dispatch(new CollectionChangedEventArgs());
    }
}
