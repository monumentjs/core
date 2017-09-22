import {IKeyValuePair} from './Abstraction/IKeyValuePair';
import {KeyValueEqualityComparator} from './KeyValueEqualityComparator';
import {IJSONSerializable} from '../Core/Abstraction/IJSONSerializable';
import {IEquatable} from '../Core/Abstraction/IEquatable';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';


export class KeyValuePair<K, V>
    implements
        IKeyValuePair<K, V>,
        IJSONSerializable<IKeyValuePair<K, V>>,
        IEquatable<IKeyValuePair<K, V>> {

    private _key: K;
    private _value: V;


    public get key(): K {
        return this._key;
    }


    public get value(): V {
        return this._value;
    }


    public constructor(key: K, value: V) {
        this._key = key;
        this._value = value;
    }


    public equals(
        other: IKeyValuePair<K, V>,
        comparator: IEqualityComparator<IKeyValuePair<K, V>> = KeyValueEqualityComparator.instance
    ): boolean {
        return comparator.equals(this, other);
    }


    public toJSON(): IKeyValuePair<K, V> {
        return {
            key: this.key,
            value: this.value
        };
    }
}

