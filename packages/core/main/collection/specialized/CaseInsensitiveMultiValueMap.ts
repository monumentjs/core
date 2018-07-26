import {EqualityComparator} from '../../EqualityComparator';
import {IgnoreCaseComparator} from '../../text/IgnoreCaseComparator';
import {KeyValuePair} from '../KeyValuePair';
import {List} from '../mutable/List';
import {LinkedMultiValueMap} from './LinkedMultiValueMap';
import {Sequence} from '../readonly/Sequence';


export class CaseInsensitiveMultiValueMap<V> extends LinkedMultiValueMap<string, V> {
    public constructor(
        values: Sequence<KeyValuePair<string, List<V>>> = [],
        valueComparator?: EqualityComparator<List<V>>
    ) {
        super(values, new IgnoreCaseComparator(), valueComparator);
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
