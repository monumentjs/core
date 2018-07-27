import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {IgnoreCaseComparator} from '../../text/IgnoreCaseComparator';
import {KeyValuePair} from '../KeyValuePair';
import {ListMap} from '../mutable/ListMap';
import {Sequence} from '../readonly/Sequence';


export class CaseInsensitiveMap<V> extends ListMap<string, V> {
    public constructor(
        values: Sequence<KeyValuePair<string, V>> = [],
        valueComparator?: EqualityComparator<V>
    ) {
        super(values, new IgnoreCaseComparator(), valueComparator);
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
