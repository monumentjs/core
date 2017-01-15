import Collection from './Collection';
/**
 * Represents a variable size last-in-first-out (LIFO) collection of instances of the same specified type.
 */
export default class Stack<T> extends Collection<T> {
    peek(): T;
    push(item: T): any;
    pop(): T;
}
