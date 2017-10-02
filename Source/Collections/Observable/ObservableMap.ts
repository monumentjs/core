import {Map} from '../Map';
import {EventBindings} from '../../Events/EventBindings';
import {EventSource} from '../../Events/EventSource';
import {MapChangedEventArgs} from './MapChangedEventArgs';
import {EventBinding} from '../../Events/EventBinding';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {IKeyValuePair} from '../Abstraction/IKeyValuePair';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {INotifyMapChanged} from './INotifyMapChanged';


export class ObservableMap<K, V> extends Map<K, V> implements IDisposable, INotifyMapChanged<K, V, ObservableMap<K, V>> {
    private readonly _eventBindings: EventBindings<this> = new EventBindings(this);

    protected readonly _onMapChanged: EventBinding<this, MapChangedEventArgs> = this._eventBindings.create();


    public get onMapChanged(): EventSource<this, MapChangedEventArgs> {
        return this._onMapChanged;
    }


    public clone(): ObservableMap<K, V> {
        return new ObservableMap(this);
    }


    public put(key: K, value: V): V | undefined {
        const oldValue: V | undefined = super.put(key, value);

        this._onMapChanged.dispatch(new MapChangedEventArgs());

        return oldValue;
    }


    public putAll(values: IEnumerable<IKeyValuePair<K, V>>): boolean {
        if (super.putAll(values)) {
            this._onMapChanged.dispatch(new MapChangedEventArgs());

            return true;
        }

        return false;
    }


    public putIfAbsent(key: K, value: V): boolean {
        if (super.putIfAbsent(key, value)) {
            this._onMapChanged.dispatch(new MapChangedEventArgs());

            return true;
        }

        return false;
    }


    public replace(key: K, newValue: V): V | undefined {
        if (this.containsKey(key)) {
            const prevItem = super.put(key, newValue);

            this._onMapChanged.dispatch(new MapChangedEventArgs());

            return prevItem;
        }

        return undefined;
    }


    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        if (super.replaceIf(key, oldValue, newValue)) {
            this._onMapChanged.dispatch(new MapChangedEventArgs());

            return true;
        }

        return false;
    }


    public removeIf(key: K, value: V): boolean {
        if (super.removeIf(key, value)) {
            this._onMapChanged.dispatch(new MapChangedEventArgs());

            return true;
        }

        return false;
    }


    public remove(key: K): V | undefined {
        const oldLength: number = this.length;
        const removedItem = super.remove(key);
        
        if (this.length !== oldLength) {
            this._onMapChanged.dispatch(new MapChangedEventArgs());
        }
        
        return removedItem;
    }
    
    
    public clear(): boolean {
        if (super.clear()) {
            this._onMapChanged.dispatch(new MapChangedEventArgs());

            return true;
        }

        return false;
    }


    public dispose(): void {
        this._eventBindings.dispose();
    }
}
