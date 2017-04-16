import {IEqualityComparator} from './IEqualityComparator';
import {IKeyValuePair} from './IKeyValuePair';
import {assertArgumentNotNull} from '../Assertion/Assert';


export default class KeyValueEqualityComparator<TKey, TValue>
    implements IEqualityComparator<IKeyValuePair<TKey, TValue>> {

    public static readonly instance: KeyValueEqualityComparator<any, any> = new KeyValueEqualityComparator<any, any>();


    public equals(x: IKeyValuePair<TKey, TValue>, y: IKeyValuePair<TKey, TValue>): boolean {
        assertArgumentNotNull('x', x);
        assertArgumentNotNull('y', y);

        return x.key === y.key && x.value === y.value;
    }

}
