import {Equatable} from '../../comparison/equality/Equatable';
import {EqualityComparator} from '../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../comparison/equality/StrictEqualityComparator';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class KeyValuePair<K, V> implements Equatable<KeyValuePair<K, V>> {
    public readonly key: K;
    public readonly value: V;

    public constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    public equals(
        other: KeyValuePair<K, V>
    ): boolean;
    public equals(
        other: KeyValuePair<K, V>,
        keyComparator: EqualityComparator<K>,
        valueComparator: EqualityComparator<V>
    ): boolean;
    public equals(
        other: KeyValuePair<K, V>,
        keyComparator: EqualityComparator<K> = StrictEqualityComparator.get(),
        valueComparator: EqualityComparator<V> = StrictEqualityComparator.get()
    ): boolean {
        return keyComparator.equals(this.key, other.key) && valueComparator.equals(this.value, other.value);
    }
}
