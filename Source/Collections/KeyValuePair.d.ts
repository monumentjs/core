import { IKeyValuePair } from './IKeyValuePair';
import { IJSONSerializable } from '../types';
export declare class KeyValuePair<TKey, TValue> implements IKeyValuePair<TKey, TValue>, IJSONSerializable<IKeyValuePair<TKey, TValue>> {
    private _key;
    private _value;
    readonly key: TKey;
    readonly value: TValue;
    constructor(key: TKey, value: TValue);
    toJSON(): IKeyValuePair<TKey, TValue>;
}
