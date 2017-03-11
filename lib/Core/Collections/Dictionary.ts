import {IDictionary} from './IDictionary';
import Collection from './Collection';
import {IKeyValuePair} from './IKeyValuePair';
import {IEqualityComparator} from './IEqualityComparator';
import KeyValuePair from './KeyValuePair';
import EqualityComparator from './EqualityComparator';
import {IEnumerable} from './IEnumerable';


export default class Dictionary<TKey, TValue>
    extends Collection<IKeyValuePair<TKey, TValue>>
    implements IDictionary<TKey, TValue> {
    
    public static fromObject<TValue>(obj: Object): Dictionary<string, TValue> {
        let dictionary: Dictionary<string, TValue> = new Dictionary<string, TValue>();
        
        Object.keys(obj).forEach((key: string): void => {
            dictionary.set(key, obj[key]);
        });
        
        return dictionary;
    }
    
    
    protected _comparator: IEqualityComparator<TKey>;
    
    
    public get keys(): Collection<TKey> {
        return new Collection<TKey>(this.toArray().map((pair: IKeyValuePair<TKey, TValue>): TKey => {
            return pair.key;
        }));
    }
    
    
    public get values(): Collection<TValue> {
        return new Collection<TValue>(this.toArray().map((pair: IKeyValuePair<TKey, TValue>): TValue => {
            return pair.value;
        }));
    }
    
    
    public get comparator(): IEqualityComparator<TKey> {
        return this._comparator;
    }
    
    
    public constructor(
        list?: IEnumerable<IKeyValuePair<TKey, TValue>>,
        comparator: IEqualityComparator<TKey> = EqualityComparator.instance
    ) {
        super(list);
        
        this._comparator = comparator;
    }
    
    
    public clone(): Dictionary<TKey, TValue> {
        return new Dictionary(this, this._comparator);
    }
    
    
    public set(key: TKey, value: TValue): void {
        if (this.containsKey(key)) {
            this.removeByKey(key);
        }

        this.add(new KeyValuePair(key, value));
    }
    
    
    public add(pair: IKeyValuePair<TKey, TValue>): void {
        if (this.containsKey(pair.key)) {
            throw new Error('Dictionary already contains value with such key.');
        }
    
        super.add(pair);
    }
    
    
    public get(key: TKey, defaultValue?: TValue): TValue {
        for (let pair of this) {
            if (this._comparator.equals(pair.key, key)) {
                return pair.value;
            }
        }
        
        return defaultValue;
    }
    
    
    public containsKey(key: TKey): boolean {
        for (let pair of this) {
            if (this._comparator.equals(pair.key, key)) {
                return true;
            }
        }
    
        return false;
    }
    
    
    public containsValue(value: TValue): boolean {
        for (let pair of this) {
            if (EqualityComparator.instance.equals(pair.value, value)) {
                return true;
            }
        }
    
        return false;
    }
    
    
    public removeByKey(key: TKey): boolean {
        let length: number = this.length;
        
        for (let index = 0; index < length; index++) {
            let pair: IKeyValuePair<TKey, TValue> = this[index];
            
            if (this._comparator.equals(pair.key, key)) {
                return this.remove(pair);
            }
        }
        
        return false;
    }
}
