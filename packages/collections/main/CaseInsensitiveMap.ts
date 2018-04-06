import {EqualityComparator} from '../../core/main/EqualityComparator';
import {StrictEqualityComparator} from '../../core/main/StrictEqualityComparator';
import {IgnoreCaseComparator} from '../../text/main/IgnoreCaseComparator';
import {KeyValuePair} from './KeyValuePair';
import {ListMap} from 'ListMap';


export class CaseInsensitiveMap<V> extends ListMap<string, V> {
    public constructor(
        values: Iterable<KeyValuePair<string, V>> = [],
        valueComparator: EqualityComparator<V> = StrictEqualityComparator.instance
    ) {
        super(values, IgnoreCaseComparator.instance, valueComparator);
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
