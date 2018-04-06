import {Collection} from './Collection';


export interface Queue<T> extends Collection<T> {
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
