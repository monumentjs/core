import Collection from './Collection';
import {IEqualityComparator} from './IEqualityComparator';
import EqualityComparator from './EqualityComparator';
import KeyValuePair from './KeyValuePair';
import {IKeyValuePair} from './IKeyValuePair';


export default class KeyValueCollection<TKey, TValue> extends Collection<IKeyValuePair<TKey, TValue>> {

    public put(key: TKey, value: TValue): void {
        this.add(new KeyValuePair(key, value));
    }
    

    public removeByKey(
        key: TKey,
        keyComparer: IEqualityComparator<TKey> = EqualityComparator.instance
    ): void {
        for (let entry of this) {
            if (keyComparer.equals(entry.key, key)) {
                this.remove(entry);
                break;
            }
        }
    }
    

    public removeAllByKey(
        key: TKey,
        keyComparer: IEqualityComparator<TKey> = EqualityComparator.instance
    ): void {
        for (let entry of this) {
            if (keyComparer.equals(entry.key, key)) {
                this.remove(entry);
            }
        }
    }
    

    public findByKey(
        key: TKey,
        keyComparer: IEqualityComparator<TKey> = EqualityComparator.instance
    ): TValue {
        for (let entry of this) {
            if (keyComparer.equals(entry.key, key)) {
                return entry.value;
            }
        }
    }
    
    /**
     *
     * @param key
     * @param keyComparer
     */
    public findAllByKey(
        key: TKey,
        keyComparer: IEqualityComparator<TKey> = EqualityComparator.instance
    ): Collection<TValue> {
        let values: Collection<TValue> = new Collection<TValue>();

        for (let entry of this) {
            if (keyComparer.equals(entry.key, key)) {
                values.add(entry.value);
            }
        }

        return values;
    }
}
