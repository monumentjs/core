import {IMultiValueMap} from '../Abstraction/IMultiValueMap';
import {List} from '../List';
import {Map} from '../Map';
import {IEnumerable} from '../Abstraction/IEnumerable';
import {IMap} from '../Abstraction/IMap';


export class MultiValueMap<K, V> extends Map<K, List<V>> implements IMultiValueMap<K, V> {
    /**
     * Add the given single value to the current list of values for the given key.
     */
    public add(key: K, value: V): void {
        let list: List<V> | undefined = this.get(key);

        if (list == null) {
            list = new List();
            this.put(key, list);
        }

        list.add(value);
    }

    /**
     * Add all the values of the given list to the current list of values for the given key.
     */
    public addAll(key: K, values: IEnumerable<V>): void {
        let list: List<V> | undefined = this.get(key);

        if (list == null) {
            list = new List();
            this.put(key, list);
        }

        list.addAll(values);
    }

    /**
     * Add all the values of the given map to the current values.
     */
    public addAllFrom(values: IMap<K, IEnumerable<V>>): void {
        for (let entry of values) {
            this.addAll(entry.key, entry.value);
        }
    }

    /**
     * Return the first value for the given key.
     */
    public getFirst(key: K): V | undefined {
        let list: List<V> | undefined = this.get(key);

        if (list == null) {
            return undefined;
        }

        return list[0];
    }

    /**
     * Set the given single value under the given key.
     */
    public setTo(key: K, value: V): void {
        let list: List<V> | undefined = this.get(key);

        if (list == null) {
            list = new List();
            this.put(key, list);
        } else {
            list.clear();
        }

        list.add(value);
    }

    /**
     * Set the given values under.
     */
    public setAllTo(values: IMap<K, V>): void {
        for (let entry of values) {
            this.setTo(entry.key, entry.value);
        }
    }

    /**
     * Returns the first values contained in this MultiValueMap.
     */
    public toSingleValueMap(): IMap<K, V> {
        let map: IMap<K, V> = new Map();

        for (let entry of this) {
            map.put(entry.key, entry.value[0] as V);
        }

        return map;
    }
}
