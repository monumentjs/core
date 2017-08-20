import {ICloneable} from '../types';
import {IEnumerable} from './IEnumerable';
import {IDictionary} from './IDictionary';
import {IKeyValuePair} from './IKeyValuePair';
import {IEqualityComparator} from './IEqualityComparator';
import {Enumerable} from './Enumerable';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {KeyValuePair} from './KeyValuePair';
import {EqualityComparator} from './EqualityComparator';
import {Assert} from '../Assertion/Assert';


export class Dictionary<TKey, TValue>
    extends
        Enumerable<IKeyValuePair<TKey, TValue>>
    implements
        IDictionary<TKey, TValue>,
        ICloneable<Dictionary<TKey, TValue>> {

    private _keyComparator: IEqualityComparator<TKey>;


    public get keys(): ReadOnlyCollection<TKey> {
        return new ReadOnlyCollection<TKey>(this.toArray().map((pair: IKeyValuePair<TKey, TValue>): TKey => {
            return pair.key;
        }));
    }


    public get values(): ReadOnlyCollection<TValue> {
        return new ReadOnlyCollection<TValue>(this.toArray().map((pair: IKeyValuePair<TKey, TValue>): TValue => {
            return pair.value;
        }));
    }


    public get keyComparator(): IEqualityComparator<TKey> {
        return this._keyComparator;
    }


    public constructor(
        list: IEnumerable<IKeyValuePair<TKey, TValue>> = [],
        comparator: IEqualityComparator<TKey> = EqualityComparator.instance
    ) {
        super();

        Assert.argument('list', list).notNull();
        Assert.argument('comparator', comparator).notNull();

        this._keyComparator = comparator;

        for (let {key, value} of list) {
            this.set(key, value);
        }
    }


    public clone(): Dictionary<TKey, TValue> {
        return new Dictionary(this, this.keyComparator);
    }


    public set(key: TKey, value: TValue): void {
        Assert.argument('key', key).notNull();

        this.removeByKey(key);

        Array.prototype.push.call(this, new KeyValuePair(key, value));
    }


    public get(key: TKey, defaultValue: TValue | null = null): TValue | null {
        Assert.argument('key', key).notNull();

        for (let pair of this) {
            if (this.keyComparator.equals(pair.key, key)) {
                return pair.value;
            }
        }

        return defaultValue;
    }


    public containsKey(key: TKey): boolean {
        Assert.argument('key', key).notNull();

        for (let pair of this) {
            if (this.keyComparator.equals(pair.key, key)) {
                return true;
            }
        }

        return false;
    }


    public containsValue(
        value: TValue,
        valueComparator: IEqualityComparator<TValue> = EqualityComparator.instance
    ): boolean {
        Assert.argument('valueComparator', valueComparator).notNull();

        for (let pair of this) {
            if (valueComparator.equals(pair.value, value)) {
                return true;
            }
        }

        return false;
    }


    public removeByKey(key: TKey): boolean {
        Assert.argument('key', key).notNull();

        let length: number = this.length;

        for (let index = 0; index < length; index++) {
            let pair: IKeyValuePair<TKey, TValue> = this[index];

            if (this.keyComparator.equals(pair.key, key)) {
                Array.prototype.splice.call(this, index, 1);

                return true;
            }
        }

        return false;
    }


    public clear(): void {
        this.length = 0;
    }
}
