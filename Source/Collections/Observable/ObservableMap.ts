import {Map} from '../Map';
import {EventFactory} from '../../Events/EventFactory';
import {EventSource} from '../../Events/EventSource';
import {MapChangedEventArgs} from './MapChangedEventArgs';
import {EventDispatcher} from '../../Events/EventDispatcher';
import {IDisposable} from '../../Core/Abstraction/IDisposable';
import {IKeyValuePair} from '../Abstraction/IKeyValuePair';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {INotifyMapChanged} from './INotifyMapChanged';


export class ObservableMap<K, V> extends Map<K, V> implements IDisposable, INotifyMapChanged<K, V, ObservableMap<K, V>> {
    private readonly _eventFactory: EventFactory<this> = new EventFactory(this);

    private readonly _mapChanged: EventDispatcher<this, MapChangedEventArgs> = this._eventFactory.create();


    public readonly mapChanged: EventSource<this, MapChangedEventArgs> = this._mapChanged;


    public clone(): ObservableMap<K, V> {
        return new ObservableMap(this);
    }


    public put(key: K, value: V): V | undefined {
        const oldValue: V | undefined = super.put(key, value);

        this.onMapChanged();

        return oldValue;
    }


    public putAll(values: IEnumerable<IKeyValuePair<K, V>>): boolean {
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
        this._eventFactory.dispose();
    }


    protected onMapChanged() {
        this._mapChanged.dispatch(new MapChangedEventArgs());
    }
}
