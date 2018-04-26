import {IteratorFunction} from '@monument/collections/main/IteratorFunction';
import {Collection} from '@monument/collections/main/Collection';
import {ListSet} from '@monument/collections/main/ListSet';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {Event} from '@monument/events/main/Event';
import {CollectionChangedEventArgs} from './CollectionChangedEventArgs';
import {ObservableCollection} from './ObservableCollection';


export class ObservableSet<T> extends ListSet<T> implements ObservableCollection<T> {
    private readonly _collectionChanged: ConfigurableEvent<this, CollectionChangedEventArgs> = new ConfigurableEvent(this);


    public get collectionChanged(): Event<this, CollectionChangedEventArgs> {
        return this._collectionChanged;
    }


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


    public addAll(items: Iterable<T>): boolean {
        if (super.addAll(items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public intersectWith(items: Collection<T>): boolean {
        if (super.intersectWith(items)) {
            this.onCollectionChanged();

            return true;
        }

        return false;
    }


    public symmetricExceptWith(items: Collection<T>): boolean {
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


    public removeAll(items: Collection<T>): boolean {
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


    public retainAll(otherItems: Collection<T>): boolean {
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
        this._collectionChanged.dispose();
    }


    protected onCollectionChanged() {
        this._collectionChanged.dispatch(new CollectionChangedEventArgs());
    }
}
