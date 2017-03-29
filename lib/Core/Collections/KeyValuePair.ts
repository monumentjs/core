import {assertArgumentNotNull} from '../../Assertion/Assert';


export default class KeyValuePair<TKey, TValue> {
    private _key: TKey;
    private _value: TValue;
    
    
    public get key(): TKey {
        return this._key;
    }
    
    
    public get value(): TValue {
        return this._value;
    }
    

    public constructor(key: TKey, value: TValue) {
        assertArgumentNotNull('key', key);

        this._key = key;
        this._value = value;
    }
}

