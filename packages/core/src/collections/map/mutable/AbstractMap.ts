import {Sequence} from '../../base/Sequence';
import {KeyValuePair} from '../../base/KeyValuePair';
import {ReadOnlyMap} from '../readonly/ReadOnlyMap';
import {Map} from './Map';
import {MapIteratorFunction} from '../../base/MapIteratorFunction';
import {AbstractReadOnlyMap} from '../readonly/AbstractReadOnlyMap';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export abstract class AbstractMap<K, V> extends AbstractReadOnlyMap<K, V> implements Map<K, V> {

    public abstract clear(): boolean;

    public abstract put(key: K, value: V): V | undefined;

    public putAll(values: Sequence<KeyValuePair<K, V>>): boolean {
        let changed: boolean = false;

        for (const {key, value} of values) {
            if (this.put(key, value)) {
                changed = true;
            }
        }

        return changed;
    }

    public putIfAbsent(key: K, value: V): boolean {
        if (!this.containsKey(key)) {
            this.put(key, value);

            return true;
        }

        return false;
    }
    public putMap(map: ReadOnlyMap<K, V>): boolean {
        return this.putAll(map);
    }

    public abstract remove(key: K): V | undefined;

    public abstract removeBy(predicate: MapIteratorFunction<K, V, boolean>): boolean;

    public abstract removeIf(key: K, value: V): boolean;

    public abstract replace(key: K, newValue: V): V | undefined;

    public abstract replaceIf(key: K, oldValue: V, newValue: V): boolean;
}
