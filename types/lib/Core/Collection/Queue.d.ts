import Collection from './Collection';
/**
 * Represents a first-in, first-out collection of objects.
 */
export default class Queue<T> extends Collection<T> {
    peek(): T;
    enqueue(item: T): any;
    dequeue(): T;
}
