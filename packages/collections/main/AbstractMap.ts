import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {Map} from './Map';
import {KeyValuePair} from './KeyValuePair';
import {AbstractReadOnlyMap} from './AbstractReadOnlyMap';


export abstract class AbstractMap<K, V> extends AbstractReadOnlyMap<K, V> implements Map<K, V> {
    private readonly _keyComparator: EqualityComparator<K>;
    private readonly _valueComparator: EqualityComparator<V>;


    public get keyComparator(): EqualityComparator<K> {
        return this._keyComparator;
    }


    public get valueComparator(): EqualityComparator<V> {
        return this._valueComparator;
    }


    public constructor(
        keyComparator: EqualityComparator<K> = StrictEqualityComparator.instance,
        valueComparator: EqualityComparator<V> = StrictEqualityComparator.instance
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
