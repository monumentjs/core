import {Assert} from '../Assertion/Assert';
import {IKeyValuePair} from './IKeyValuePair';
import {IJSONSerializable} from '../types';


export class KeyValuePair<TKey, TValue> implements IKeyValuePair<TKey, TValue>, IJSONSerializable<IKeyValuePair<TKey, TValue>> {
    private _key: TKey;
    private _value: TValue;


    public get key(): TKey {
        return this._key;
    }


    public get value(): TValue {
        return this._value;
    }


    public constructor(key: TKey, value: TValue) {
        Assert.argument('key', key).notNull();

        this._key = key;
        this._value = value;
    }


    public toJSON(): IKeyValuePair<TKey, TValue> {
        return {
            key: this.key,
            value: this.value
        };
    }
}

