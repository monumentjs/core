import {LinkedMap} from '../mutable/LinkedMap';
import {Sequence} from '../../base/Sequence';
import {KeyValuePair} from '../../base/KeyValuePair';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {IgnoreCaseEqualityComparator} from '../../../comparison/equality/IgnoreCaseEqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class CaseInsensitiveMap<V> extends LinkedMap<string, V> {
    public constructor(
        values: Sequence<KeyValuePair<string, V>> = [],
        valueComparator: EqualityComparator<V> = StrictEqualityComparator.get()
    ) {
        super(values, IgnoreCaseEqualityComparator.get(), valueComparator);
    }

    public clone(): CaseInsensitiveMap<V> {
        return new CaseInsensitiveMap(this, this.valueComparator);
    }

    public put(key: string, value: V): V | undefined {
        return super.put(this.normalizeKey(key), value);
    }

    public remove(key: string): V | undefined {
        return super.remove(this.normalizeKey(key));
    }

    protected normalizeKey(key: string): string {
        return key.toLowerCase();
    }
}
