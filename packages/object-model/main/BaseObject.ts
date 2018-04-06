import {Map} from '../../collections/main/Map';
import {ListMap} from '@monument/collections/main/ListMap';
import {Key} from './Key';


export class BaseObject {
    private _properties: Map<Key<any>, any> = new ListMap();


    protected getProperty<T>(key: Key<T>): T | undefined {
        return this._properties.get(key);
    }


    protected setProperty<T>(key: Key<T>, value: T): boolean {
        return this._properties.put(key, value);
    }
}
