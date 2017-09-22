import {EmptyStackException} from './EmptyStackException';
import {Collection} from './Collection';
import {IStack} from './Abstraction/IStack';


/**
 * Represents a variable size last-in-first-out (LIFO) collection of instances of the same specified type.
 */
export class Stack<T> extends Collection<T> implements IStack<T> {
    public clone(): Stack<T> {
        return new Stack(this);
    }


    public peek(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return this[this.length - 1] as T;
    }


    public pop(): T {
        if (this.isEmpty) {
            throw new EmptyStackException();
        }

        return Array.prototype.pop.call(this);
    }
}
