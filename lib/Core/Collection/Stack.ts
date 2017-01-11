import Collection from './Collection';


const _pop = Array.prototype.pop;
const _push = Array.prototype.push;

/**
 * Represents a variable size last-in-first-out (LIFO) collection of instances of the same specified type.
 */
export default class Stack<T> extends Collection<T> {
    public peek(): T {
        if (this.length > 0) {
            return this[this.length - 1];
        }
    }


    public push(item: T) {
        return _push.call(this, item);
    }


    public pop(): T {
        return _pop.call(this);
    }
}
