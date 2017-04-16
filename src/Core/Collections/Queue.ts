import Enumerable from './Enumerable';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import {IEqualityComparator} from './IEqualityComparator';
import EqualityComparator from './EqualityComparator';
import {assertArgumentNotNull} from '../Assertion/Assert';


/**
 * Represents a first-in, first-out collection of objects.
 */
export default class Queue<T> extends Enumerable<T> {
    public peek(): T {
        if (this.length === 0) {
            throw new InvalidOperationException(`Queue is empty.`);
        }

        return this[0];
    }


    public enqueue(item: T): void {
        return Array.prototype.unshift.call(this, item);
    }


    public dequeue(): T {
        if (this.length === 0) {
            throw new InvalidOperationException(`Queue is empty.`);
        }

        return Array.prototype.pop.call(this);
    }


    public clear(): void {
        this.length = 0;
    }


    public contains(
        searchItem: T,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        assertArgumentNotNull('comparator', comparator);

        for (let currentItem of this) {
            if (comparator.equals(searchItem, currentItem)) {
                return true;
            }
        }

        return false;
    }
}
