import {IKeyValuePair} from './Abstraction/IKeyValuePair';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';


export class KeyValueEqualityComparator<TKey, TValue> implements IEqualityComparator<IKeyValuePair<TKey, TValue>> {
    public static readonly instance: KeyValueEqualityComparator<any, any> = new KeyValueEqualityComparator<any, any>();


    public equals(x: IKeyValuePair<TKey, TValue>, y: IKeyValuePair<TKey, TValue>): boolean {
        return x.key === y.key && x.value === y.value;
    }
}
