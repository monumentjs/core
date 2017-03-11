import Collection from './Collection';


/**
 * Represents a first-in, first-out collection of objects.
 */
export default class Queue<T> extends Collection<T> {
    public peek(): T {
        return this[0];
    }


    public enqueue(item: T): void {
        return Array.prototype.unshift.call(this, item);
    }


    public dequeue(): T {
        return Array.prototype.pop.call(this);
    }
}
