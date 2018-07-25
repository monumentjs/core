import {List} from './List';


export interface Queue<T> extends List<T> {
    enqueue(item: T): boolean;

    /**
     * @throws {EmptyQueueException}
     */
    peek(): T;

    /**
     * @throws {EmptyQueueException}
     */
    pop(): T;
}
