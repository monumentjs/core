import {IList} from './types';
import Collection from './Collection';


let _indexOf = Array.prototype.indexOf;
let _splice = Array.prototype.splice;
let _slice = Array.prototype.slice;


export default class List<T> extends Collection<T> implements IList<T> {
    public clone(): List<T> {
        return new List<T>(this.toArray());
    }


    public insert(item: T, index: number) {
        _splice.call(this, index, 0, item);
    }


    public removeAt(index: number): T {
        let removedItem: T = this[index];

        _splice.call(this, index, 1);

        return removedItem;
    }


    public indexOf(item: T): number {
        return _indexOf.call(this, item);
    }


    public toArray(): T[] {
        return _slice.call(this, 0);
    }
}
