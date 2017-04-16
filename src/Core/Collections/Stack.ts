import Enumerable from './Enumerable';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import EqualityComparator from './EqualityComparator';
import {IEqualityComparator} from './IEqualityComparator';
import {assertArgumentNotNull} from '../Assertion/Assert';


/**
 * Represents a variable size last-in-first-out (LIFO) collection of instances of the same specified type.
 */
export default class Stack<T> extends Enumerable<T> {
    public peek(): T {
        if (this.length === 0) {
            throw new InvalidOperationException(`Stack is empty.`);
        }

        if (this.length > 0) {
            return this[this.length - 1];
        }

        return null;
    }


    public push(item: T): void {
        return Array.prototype.push.call(this, item);
    }


    public pop(): T {
        if (this.length === 0) {
            throw new InvalidOperationException(`Stack is empty.`);
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
