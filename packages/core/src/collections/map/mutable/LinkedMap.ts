import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {KeyValuePair} from '../../base/KeyValuePair';
import {Sequence} from '../../base/Sequence';
import {Cloneable} from '../../../base/Cloneable';
import {AbstractMap} from './AbstractMap';
import {MapIteratorFunction} from '../../base/MapIteratorFunction';
import {ArrayList} from '../../list/mutable/ArrayList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class LinkedMap<K, V> extends AbstractMap<K, V> implements Cloneable<LinkedMap<K, V>> {
    private readonly _mapping: ArrayList<KeyValuePair<K, V>> = new ArrayList();

    public get length(): number {
        return this._mapping.length;
    }

    public constructor(
        items?: Sequence<KeyValuePair<K, V>>,
        keyComparator?: EqualityComparator<K>,
        valueComparator?: EqualityComparator<V>
    ) {
        super(keyComparator, valueComparator);

        if (items) {
            this.putAll(items);
        }
    }

    public [Symbol.iterator](): Iterator<KeyValuePair<K, V>> {
        return this._mapping[Symbol.iterator]();
    }

    public clear(): boolean {
        return this._mapping.clear();
    }

    public clone(): LinkedMap<K, V> {
        return new LinkedMap(this, this.keyComparator, this.valueComparator);
    }

    public put(key: K, value: V): V | undefined {
        const newPair: KeyValuePair<K, V> = new KeyValuePair(key, value);
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(pair.key, key)) {
                this._mapping.setAt(index, newPair);

                return pair.value;
            }

            index++;
        }

        this._mapping.add(newPair);

        return undefined;
    }

    public putAll(values: Sequence<KeyValuePair<K, V>>): boolean {
        let hasOverridden: boolean = false;

        for (const newPair of values) {
            let index: number = 0;
            let isReplaced: boolean = false;

            for (const pair of this._mapping) {
                if (this.keyComparator.equals(pair.key, newPair.key)) {
                    this._mapping.setAt(index, newPair);

                    isReplaced = true;

                    break;
                }

                index++;
            }

            if (!isReplaced) {
                this._mapping.add(newPair);
            }

            hasOverridden = true;
        }

        return hasOverridden;
    }

    public remove(key: K): V | undefined {
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(pair.key, key)) {
                this._mapping.removeAt(index);

                return pair.value;
            }

            index++;
        }

        return undefined;
    }

    public removeBy(predicate: MapIteratorFunction<K, V, boolean>): boolean {
        return this._mapping.removeBy(({key, value}) => {
            return predicate(key, value);
        });
    }

    public removeIf(key: K, value: V): boolean {
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(key, pair.key) &&
                this.valueComparator.equals(value, pair.value)) {
                this._mapping.removeAt(index);

                return true;
            }

            index++;
        }

        return false;
    }

    public replace(key: K, newValue: V): V | undefined {
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(key, pair.key)) {
                this._mapping.setAt(index, new KeyValuePair(key, newValue));

                return pair.value;
            }

            index++;
        }

        return undefined;
    }

    public replaceIf(key: K, oldValue: V, newValue: V): boolean {
        let index: number = 0;

        for (const pair of this._mapping) {
            if (this.keyComparator.equals(key, pair.key) && this.valueComparator.equals(oldValue, pair.value)) {
                this._mapping.setAt(index, new KeyValuePair(key, newValue));

                return true;
            }

            index++;
        }

        return false;
    }
}
