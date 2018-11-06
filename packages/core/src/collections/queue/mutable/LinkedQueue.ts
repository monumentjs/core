import {Cloneable} from '../../../base/Cloneable';
import {EmptyQueueException} from '../EmptyQueueException';
import {Queue} from './Queue';
import {LinkedList} from '../../list/mutable/LinkedList';
import {QueryableProxy} from '../../base/proxy/QueryableProxy';


/**
 * Represents a first-in, first-out collection of objects.
 *
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class LinkedQueue<T> extends QueryableProxy<T, LinkedList<T>> implements Queue<T>, Cloneable<LinkedQueue<T>> {

    public constructor(items?: Iterable<T>) {
        super(new LinkedList());

        if (items) {
            for (const item of items) {
                this.enqueue(item);
            }
        }
    }

    public clear(): boolean {
        return this._items.clear();
    }

    public clone(): LinkedQueue<T> {
        return new LinkedQueue(this);
    }

    public dequeue(): T {
        if (this.isEmpty) {
            throw new EmptyQueueException();
        }

        return this._items.removeAt(0);
    }

    public enqueue(item: T): boolean {
        return this._items.add(item);
    }

    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyQueueException();
        }

        return this._items.getAt(0);
    }
}
