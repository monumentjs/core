import {ICloneable} from '../types';
import {IEnumerable} from './IEnumerable';
import {IDictionary} from './IDictionary';
import {IKeyValuePair} from './IKeyValuePair';
import {IEqualityComparator} from './IEqualityComparator';
import {Enumerable} from './Enumerable';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {KeyValuePair} from './KeyValuePair';
import {EqualityComparator} from './EqualityComparator';
import {assertArgumentNotNull} from '../Assertion/Assert';


export class Dictionary<TKey, TValue>
    extends Enumerable<IKeyValuePair<TKey, TValue>>
    implements IDictionary<TKey, TValue>, ICloneable<Dictionary<TKey, TValue>> {
    
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

        assertArgumentNotNull('list', list);
        assertArgumentNotNull('comparator', comparator);

        this._keyComparator = comparator;

        for (let {key, value} of list) {
            this.set(key, value);
        }
    }
    
    
    public clone(): Dictionary<TKey, TValue> {
        return new Dictionary(this, this._keyComparator);
    }
    
    
    public set(key: TKey, value: TValue): void {
        assertArgumentNotNull('key', key);

        this.removeByKey(key);

        Array.prototype.push.call(this, new KeyValuePair(key, value));
    }
    

    public get(key: TKey, defaultValue: TValue = null): TValue {
        assertArgumentNotNull('key', key);

        for (let pair of this) {
            if (this._keyComparator.equals(pair.key, key)) {
                return pair.value;
            }
        }
        
        return defaultValue;
    }
    
    
    public containsKey(key: TKey): boolean {
        assertArgumentNotNull('key', key);

        for (let pair of this) {
            if (this._keyComparator.equals(pair.key, key)) {
                return true;
            }
        }
    
        return false;
    }
    
    
    public containsValue(
        value: TValue,
        valueComparator: IEqualityComparator<TValue> = EqualityComparator.instance
    ): boolean {
        assertArgumentNotNull('valueComparator', valueComparator);

        for (let pair of this) {
            if (valueComparator.equals(pair.value, value)) {
                return true;
            }
        }
    
        return false;
    }
    
    
    public removeByKey(key: TKey): boolean {
        assertArgumentNotNull('key', key);

        let length: number = this.length;
        
        for (let index = 0; index < length; index++) {
            let pair: IKeyValuePair<TKey, TValue> = this[index];
            
            if (this._keyComparator.equals(pair.key, key)) {
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
