import Collection from './Collection';
import {IEqualityComparator} from './IEqualityComparator';
import EqualityComparator from './EqualityComparator';
import KeyValuePair from './KeyValuePair';
import {IKeyValuePair} from './IKeyValuePair';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export default class KeyValueCollection<TKey, TValue> extends Collection<IKeyValuePair<TKey, TValue>> {

    public put(key: TKey, value: TValue): void {
        assertArgumentNotNull('key', key);

        this.add(new KeyValuePair(key, value));
    }
    

    public removeByKey(
        key: TKey,
        keyComparator: IEqualityComparator<TKey> = EqualityComparator.instance
    ): void {
        assertArgumentNotNull('key', key);
        assertArgumentNotNull('keyComparator', keyComparator);

        for (let entry of this) {
            if (keyComparator.equals(entry.key, key)) {
                this.remove(entry);
                break;
            }
        }
    }
    

    public removeAllByKey(
        key: TKey,
        keyComparator: IEqualityComparator<TKey> = EqualityComparator.instance
    ): void {
        assertArgumentNotNull('key', key);
        assertArgumentNotNull('keyComparator', keyComparator);

        for (let entry of this) {
            if (keyComparator.equals(entry.key, key)) {
                this.remove(entry);
            }
        }
    }
    

    public findByKey(
        key: TKey,
        keyComparator: IEqualityComparator<TKey> = EqualityComparator.instance
    ): TValue {
        assertArgumentNotNull('key', key);
        assertArgumentNotNull('keyComparator', keyComparator);

        for (let entry of this) {
            if (keyComparator.equals(entry.key, key)) {
                return entry.value;
            }
        }
    }
    
    /**
     *
     * @param key
     * @param keyComparator
     */
    public findAllByKey(
        key: TKey,
        keyComparator: IEqualityComparator<TKey> = EqualityComparator.instance
    ): Collection<TValue> {
        assertArgumentNotNull('key', key);
        assertArgumentNotNull('keyComparator', keyComparator);

        let values: Collection<TValue> = new Collection<TValue>();

        for (let entry of this) {
            if (keyComparator.equals(entry.key, key)) {
                values.add(entry.value);
            }
        }

        return values;
    }
}
