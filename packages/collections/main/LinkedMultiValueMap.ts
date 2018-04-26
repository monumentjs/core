import {Enumerable} from './Enumerable';
import {Map} from './Map';
import {List} from './List';
import {MultiValueMap} from './MultiValueMap';
import {ListMap} from './ListMap';
import {ArrayList} from './ArrayList';


export class LinkedMultiValueMap<K, V> extends ListMap<K, List<V>> implements MultiValueMap<K, V> {
    /**
     * Add the given single value to the current list of values for the given methodName.
     */
    public add(key: K, value: V): void {
        let list: List<V> | undefined = this.get(key);

        if (list == null) {
            list = new ArrayList();

            this.put(key, list);
        }

        list.add(value);
    }

    /**
     * Add all the values of the given list to the current list of values for the given methodName.
     */
    public addAll(key: K, values: Enumerable<V>): void {
        let list: List<V> | undefined = this.get(key);

        if (list == null) {
            list = new ArrayList();

            this.put(key, list);
        }

        list.addAll(values);
    }

    /**
     * Add all the values of the given map to the current values.
     */
    public addAllFrom(values: Map<K, Enumerable<V>>): void {
        for (let entry of values) {
            this.addAll(entry.key, entry.value);
        }
    }


    public removeValue(key: K, value: V): boolean {
        let items: List<V> | undefined = this.get(key);

        if (items == null) {
            return false;
        }

        return items.remove(value);
    }

    /**
     * Return the first value for the given methodName.
     */
    public getFirst(key: K): V | undefined {
        let list: List<V> | undefined = this.get(key);

        if (list == null) {
            return undefined;
        }

        return list.getAt(0);
    }

    /**
     * Set the given single value under the given methodName.
     */
    public setTo(key: K, value: V): void {
        let list: List<V> | undefined = this.get(key);

        if (list == null) {
            list = new ArrayList();
            this.put(key, list);
        } else {
            list.clear();
        }

        list.add(value);
    }

    /**
     * Set the given values.
     */
    public setAllTo(values: Map<K, V>): void {
        for (let entry of values) {
            this.setTo(entry.key, entry.value);
        }
    }

    /**
     * Returns the first values contained in this LinkedMultiValueMap.
     */
    public toSingleValueMap(): Map<K, V> {
        let map: Map<K, V> = new ListMap();

        for (let entry of this) {
            map.put(entry.key, entry.value.getAt(0));
        }

        return map;
    }
}
