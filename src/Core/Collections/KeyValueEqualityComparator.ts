import {IEqualityComparator} from './IEqualityComparator';
import {IKeyValuePair} from './IKeyValuePair';
import {Assert} from '../Assertion/Assert';


export class KeyValueEqualityComparator<TKey, TValue>
    implements IEqualityComparator<IKeyValuePair<TKey, TValue>> {

    public static readonly instance: KeyValueEqualityComparator<any, any> = new KeyValueEqualityComparator<any, any>();


    public equals(x: IKeyValuePair<TKey, TValue>, y: IKeyValuePair<TKey, TValue>): boolean {
        Assert.argument('x', x).notNull();
        Assert.argument('y', y).notNull();

        return x.key === y.key && x.value === y.value;
    }

}
