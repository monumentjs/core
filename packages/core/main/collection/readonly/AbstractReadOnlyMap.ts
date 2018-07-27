import {Equatable} from '../../utils/comparison/Equatable';
import {ReadOnlyMap} from './ReadOnlyMap';
import {KeyValuePair} from '../KeyValuePair';
import {ReadOnlySet} from './ReadOnlySet';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {AbstractSequence} from './AbstractSequence';
import {IteratorFunction} from '../IteratorFunction';
import {ZERO} from '../../Constants';
import {StrictEqualityComparator} from '../../utils/comparison/StrictEqualityComparator';


export abstract class AbstractReadOnlyMap<K, V> extends AbstractSequence<KeyValuePair<K, V>> implements ReadOnlyMap<K, V>, Equatable<ReadOnlyMap<K, V>> {
    private readonly _keyComparator: EqualityComparator<K>;
    private readonly _valueComparator: EqualityComparator<V>;

    public get isEmpty(): boolean {
        return this.length === ZERO;
    }

    public get keyComparator(): EqualityComparator<K> {
        return this._keyComparator;
    }

    public abstract get keys(): ReadOnlySet<K>;

    public get valueComparator(): EqualityComparator<V> {
        return this._valueComparator;
    }

    public abstract get values(): ReadOnlyCollection<V>;

    protected constructor(
        keyComparator: EqualityComparator<K> = StrictEqualityComparator.get(),
        valueComparator: EqualityComparator<V> = StrictEqualityComparator.get()
    ) {
        super();

        this._keyComparator = keyComparator;
        this._valueComparator = valueComparator;
    }

    public containsEntry(key: K, value: V): boolean {
        for (const pair of this) {
            if (this.checkEquality(pair.key, key, this.keyComparator) &&
                this.checkEquality(pair.value, value, this.valueComparator)) {
                return true;
            }
        }

        return false;
    }

    public containsKey(key: K): boolean {
        for (const pair of this) {
            if (this.checkEquality(pair.key, key, this.keyComparator)) {
                return true;
            }
        }

        return false;
    }

    public containsValue(value: V): boolean {
        for (const pair of this) {
            if (this.checkEquality(pair.value, value, this.valueComparator)) {
                return true;
            }
        }

        return false;
    }

    public equals(other: ReadOnlyMap<K, V>): boolean {
        if (this === other) {
            return true;
        }

        if (this.keys.length !== other.keys.length) {
            return false;
        }

        for (const {key, value} of this) {
            if (!other.containsEntry(key, value)) {
                return false;
            }
        }

        for (const {key, value} of other) {
            if (!this.containsEntry(key, value)) {
                return false;
            }
        }

        return true;
    }

    public forEach(iterator: IteratorFunction<KeyValuePair<K, V>, false | void>): void {
        let index: number = 0;

        for (const pair of this) {
            const stop: boolean = iterator(pair, index) === false;

            if (stop) {
                break;
            }

            index++;
        }
    }

    public abstract forEachReversed(iterator: IteratorFunction<KeyValuePair<K, V>, boolean | void>): void;

    public abstract forEachReversed(iterator: IteratorFunction<KeyValuePair<K, V>, boolean | void>, startIndex: number): void;

    public abstract forEachReversed(iterator: IteratorFunction<KeyValuePair<K, V>, boolean | void>, startIndex: number, count: number): void;

    public get(key: K, defaultValue: V): V;

    public get(key: K): V | undefined;

    public get(key: K, defaultValue?: V): V | undefined {
        for (const pair of this) {
            if (this.checkEquality(pair.key, key, this.keyComparator)) {
                return pair.value;
            }
        }

        return defaultValue;
    }

    public keyOf(value: V): K | undefined {
        for (const pair of this) {
            if (this.checkEquality(pair.value, value, this.valueComparator)) {
                return pair.key;
            }
        }
    }

    public toArray(): Array<KeyValuePair<K, V>> {
        return [...this];
    }
}
