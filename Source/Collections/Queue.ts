import {EmptyQueueException} from './EmptyQueueException';
import {IQueue} from './Abstraction/IQueue';
import {Collection} from './Collection';


/**
 * Represents a first-in, first-out collection of objects.
 */
export class Queue<T> extends Collection<T> implements IQueue<T> {
    public clone(): Queue<T> {
        return new Queue(this);
    }


    public add(item: T): boolean {
        Array.prototype.unshift.call(this, item);

        return true;
    }


    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyQueueException();
        }

        return this[0] as T;
    }


    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyQueueException();
        }

        return Array.prototype.pop.call(this);
    }
}
