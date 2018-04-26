import {ListMap} from '@monument/collections/main/ListMap';
import {KeyValuePair} from '@monument/collections/main/KeyValuePair';
import {Enumerable} from '@monument/collections/main/Enumerable';
import {Disposable} from '@monument/core/main/Disposable';
import {Event} from '@monument/events/main/Event';
import {ConfigurableEvent} from '@monument/events/main/ConfigurableEvent';
import {MapChangedEventArgs} from './MapChangedEventArgs';
import {NotifyMapChanged} from './NotifyMapChanged';


export class ObservableMap<K, V> extends ListMap<K, V> implements Disposable, NotifyMapChanged<K, V> {
    private readonly _mapChanged: ConfigurableEvent<this, MapChangedEventArgs> = new ConfigurableEvent(this);


    public get mapChanged(): Event<this, MapChangedEventArgs> {
        return this._mapChanged;
    }


    public clone(): ObservableMap<K, V> {
        return new ObservableMap(this);
    }


    public put(key: K, value: V): V | undefined {
        const oldValue: V | undefined = super.put(key, value);

        this.onMapChanged();

        return oldValue;
    }


    public putAll(values: Enumerable<KeyValuePair<K, V>>): boolean {
        if (super.putAll(values)) {
            this.onMapChanged();

            return true;
        }

        return false;
    }


    public putIfAbsent(key: K, value: V): boolean {
        if (super.putIfAbsent(key, value)) {
            this.onMapChanged();

            return true;
        }

        return false;
    }


    public replace(key: K, newValue: V): V | undefined {
        if (this.containsKey(key)) {
            const prevItem = super.put(key, newValue);

            this.onMapChanged();

            return prevItem;
        }

        return undefined;
    }


    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        if (super.replaceIf(key, oldValue, newValue)) {
            this.onMapChanged();

            return true;
        }

        return false;
    }


    public removeIf(key: K, value: V): boolean {
        if (super.removeIf(key, value)) {
            this.onMapChanged();

            return true;
        }

        return false;
    }


    public remove(key: K): V | undefined {
        const oldLength: number = this.length;
        const removedItem = super.remove(key);

        if (this.length !== oldLength) {
            this.onMapChanged();
        }

        return removedItem;
    }


    public clear(): boolean {
        if (super.clear()) {
            this.onMapChanged();

            return true;
        }

        return false;
    }


    public dispose(): void {
        this._mapChanged.dispose();
    }


    protected onMapChanged(): void {
        this._mapChanged.dispatch(new MapChangedEventArgs());
    }
}
