import {Collection} from './Collection';
import {EqualityComparator} from '../Core/EqualityComparator';
import {KeyValuePair} from './KeyValuePair';
import {IKeyValuePair} from './Abstraction/IKeyValuePair';
import {KeyValueEqualityComparator} from './KeyValueEqualityComparator';
import {IEnumerable} from './Abstraction/IEnumerable';
import {IReadOnlyCollection} from './Abstraction/IReadOnlyCollection';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';


export class KeyValueCollection<K, V> extends Collection<IKeyValuePair<K, V>> {

    public clone(): KeyValueCollection<K, V> {
        return new KeyValueCollection(this);
    }


    public equals(
        other: IEnumerable<IKeyValuePair<K, V>>,
        comparator: IEqualityComparator<IKeyValuePair<K, V>> = KeyValueEqualityComparator.instance
    ): boolean {
        return super.equals(other, comparator);
    }


    public contains(
        pair: IKeyValuePair<K, V>,
        comparator: IEqualityComparator<IKeyValuePair<K, V>> = KeyValueEqualityComparator.instance
    ): boolean {
        return super.contains(pair, comparator);
    }


    public containsAll(
        pairs: IEnumerable<IKeyValuePair<K, V>>,
        comparator: IEqualityComparator<IKeyValuePair<K, V>> = KeyValueEqualityComparator.instance
    ): boolean {
        return super.containsAll(pairs, comparator);
    }


    public containsKey(
        key: K,
        keyComparator: IEqualityComparator<K> = EqualityComparator.instance
    ): boolean {
        for (let entry of this) {
            if (keyComparator.equals(key, entry.key)) {
                return true;
            }
        }

        return false;
    }


    public put(key: K, value: V): boolean {
        return this.add(new KeyValuePair(key, value));
    }


    public remove(
        pair: IKeyValuePair<K, V>,
        comparator: IEqualityComparator<IKeyValuePair<K, V>> = KeyValueEqualityComparator.instance
    ): boolean {
        return super.remove(pair, comparator);
    }


    public removeAll(
        pairs: IEnumerable<IKeyValuePair<K, V>>,
        comparator: IEqualityComparator<IKeyValuePair<K, V>> = KeyValueEqualityComparator.instance
    ): boolean {
        return super.removeAll(pairs, comparator);
    }


    public removeByKey(
        key: K,
        keyComparator: IEqualityComparator<K> = EqualityComparator.instance
    ): boolean {
        for (let entry of this) {
            if (keyComparator.equals(entry.key, key)) {
                this.remove(entry);

                return true;
            }
        }

        return false;
    }


    public removeAllByKey(
        key: K,
        keyComparator: IEqualityComparator<K> = EqualityComparator.instance
    ): boolean {
        const oldLength: number = this.length;

        for (let entry of this) {
            if (keyComparator.equals(entry.key, key)) {
                this.remove(entry);
            }
        }

        return this.length !== oldLength;
    }


    public findByKey(
        key: K,
        keyComparator: IEqualityComparator<K> = EqualityComparator.instance
    ): V | undefined {
        for (let entry of this) {
            if (keyComparator.equals(entry.key, key)) {
                return entry.value;
            }
        }

        return undefined;
    }


    public findAllByKey(
        key: K,
        keyComparator: IEqualityComparator<K> = EqualityComparator.instance
    ): IReadOnlyCollection<V> {
        let values: Collection<V> = new Collection<V>();

        for (let entry of this) {
            if (keyComparator.equals(entry.key, key)) {
                values.add(entry.value);
            }
        }

        return values;
    }
}
