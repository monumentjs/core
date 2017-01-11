import Collection from './Collection';


const _pop = Array.prototype.pop;
const _unshift = Array.prototype.unshift;

/**
 * Represents a first-in, first-out collection of objects.
 */
export default class Queue<T> extends Collection<T> {
    public peek(): T {
        return this[0];
    }


    public enqueue(item: T) {
        return _unshift.call(this, item);
    }


    public dequeue(): T {
        return _pop.call(this);
    }
}
