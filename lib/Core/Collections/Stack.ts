import Collection from './Collection';


/**
 * Represents a variable size last-in-first-out (LIFO) collection of instances of the same specified type.
 */
export default class Stack<T> extends Collection<T> {
    public peek(): T {
        if (this.length > 0) {
            return this[this.length - 1];
        }
    }


    public push(item: T): void {
        return Array.prototype.push.call(this, item);
    }


    public pop(): T {
        return Array.prototype.pop.call(this);
    }
}
