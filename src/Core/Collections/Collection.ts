import {ICloneable} from '../types';
import {ICollection} from './ICollection';
import ReadOnlyCollection from './ReadOnlyCollection';


export default class Collection<T> extends ReadOnlyCollection<T> implements ICollection<T>, ICloneable<Collection<T>> {

    public clone(): Collection<T> {
        return new Collection(this);
    }


    public add(item: T): void {
        Array.prototype.push.call(this, item);
    }


    public remove(item: T): boolean {
        let index: number;

        index = Array.prototype.indexOf.call(this, item);

        if (index >= 0) {
            Array.prototype.splice.call(this, index, 1);

            return true;
        }

        return false;
    }


    public clear(): void {
        this.length = 0;
    }
}

