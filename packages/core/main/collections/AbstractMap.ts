import {EqualityComparator} from '../EqualityComparator';
import {Map} from './Map';
import {KeyValuePair} from './KeyValuePair';
import {AbstractReadOnlyMap} from './AbstractReadOnlyMap';


export abstract class AbstractMap<K, V> extends AbstractReadOnlyMap<K, V> implements Map<K, V> {
    private readonly _keyComparator: EqualityComparator<K> | undefined;
    private readonly _valueComparator: EqualityComparator<V> | undefined;


    public get keyComparator(): EqualityComparator<K> | undefined {
        return this._keyComparator;
    }


    public get valueComparator(): EqualityComparator<V> | undefined {
        return this._valueComparator;
    }


    public constructor(
        keyComparator?: EqualityComparator<K>,
        valueComparator?: EqualityComparator<V>
    ) {
        super();

        this._keyComparator = keyComparator;
        this._valueComparator = valueComparator;
    }


    public abstract clear(): boolean;


    public abstract clone(): Map<K, V>;


    public abstract put(key: K, value: V): V | undefined;


    public abstract putAll(values: Iterable<KeyValuePair<K, V>>): boolean;


    public abstract putIfAbsent(key: K, value: V): boolean;


    public abstract remove(key: K): V | undefined;


    public abstract removeIf(key: K, value: V): boolean;


    public abstract replace(key: K, newValue: V): V | undefined;


    public abstract replaceIf(key: K, oldValue: V, newValue: V): boolean;
}
