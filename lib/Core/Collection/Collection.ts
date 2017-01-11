import {ICloneable, IJSONSerializable} from '../types';
import {ICollection} from './types';
import {BaseCollection} from './BaseCollection';


let _indexOf = Array.prototype.indexOf;
let _splice = Array.prototype.splice;
let _slice = Array.prototype.slice;
let _push = Array.prototype.push;


export default class Collection<T>
extends BaseCollection<T>
implements ICloneable<Collection<T>>, ICollection<T>, IJSONSerializable<T[]> {
    constructor(list: Iterable<T> = []) {
        super();
        _splice.call(this, 0, 0, ...list);
    }


    public clone(): Collection<T> {
        return new Collection(this);
    }


    public add(item: T) {
        _push.call(this, item);
    }


    public item(index: number, item?: T): T | void {
        if (arguments.length === 2) {
            this[index] = item;
        } else {
            return this[index];
        }
    }


    public remove(item: T): T {
        let index: number = _indexOf.call(this, item);

        _splice.call(this, index, 1);

        return item;
    }


    public clear() {
        this.length = 0;
    }


    public has(item: T): boolean {
        return _indexOf.call(this, item) >= 0;
    }


    public toJSON(): T[] {
        return _slice.call(this, 0);
    }
}
