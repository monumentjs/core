import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {IgnoreCaseComparator} from '@monument/text/main/IgnoreCaseComparator';
import {KeyValuePair} from '@monument/collections-core/main/KeyValuePair';
import {List} from '@monument/collections-core/main/List';
import {LinkedMultiValueMap} from './LinkedMultiValueMap';


export class CaseInsensitiveMultiValueMap<V> extends LinkedMultiValueMap<string, V> {
    public constructor(
        values: Iterable<KeyValuePair<string, List<V>>> = [],
        valueComparator: EqualityComparator<List<V>> = StrictEqualityComparator.instance
    ) {
        super(values, IgnoreCaseComparator.instance, valueComparator);
    }


    public put(key: string, value: List<V>): List<V> | undefined {
        return super.put(this.normalizeKey(key), value);
    }


    public remove(key: string): List<V> | undefined {
        return super.remove(this.normalizeKey(key));
    }


    public clone(): CaseInsensitiveMultiValueMap<V> {
        return new CaseInsensitiveMultiValueMap(this);
    }


    protected normalizeKey(key: string): string {
        return key.toLowerCase();
    }
}
