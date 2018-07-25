import {EmptyQueueException} from './EmptyQueueException';
import {Queue} from './Queue';
import {LinkedList} from './LinkedList';
import {Sequence} from './Sequence';
import {Cloneable} from '../Cloneable';
import {ZERO} from '../Constants';
import {ListWrapper} from './ListWrapper';


/**
 * Represents a first-in, first-out collection of objects.
 */
export class ListQueue<T> extends ListWrapper<T> implements Queue<T>, Cloneable<ListQueue<T>> {

    public constructor(items?: Sequence<T>) {
        super(new LinkedList(items));
    }

    public clone(): ListQueue<T> {
        return new ListQueue(this);
    }

    public enqueue(item: T): boolean {
        return this.insert(ZERO, item);
    }

    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyQueueException();
        }

        return this.getAt(ZERO);
    }

    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyQueueException();
        }

        return this.removeAt(this.lastIndex);
    }
}
