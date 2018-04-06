import {Queue} from './Queue';


export interface Deque<T> extends Queue<T> {
    addFirst(item: T): void;
    removeFirst(): T;
    getFirst(): T;

    addLast(item: T): void;
    removeLast(): T;
    getLast(): T;

    offerFirst(item: T): boolean;
    pollFirst(): T | undefined;
    pickFirst(): T | undefined;

    offerLast(item: T): boolean;
    pollLast(): T | undefined;
    pickLast(): T | undefined;
}
