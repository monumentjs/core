import {Queue} from './Queue';


export interface Deque<T> extends Queue<T> {
    addFirst(item: T): void;

    addLast(item: T): void;

    getFirst(): T;

    getLast(): T;

    offerFirst(item: T): boolean;

    offerLast(item: T): boolean;

    pickFirst(): T | undefined;

    pickLast(): T | undefined;

    pollFirst(): T | undefined;

    pollLast(): T | undefined;

    removeFirst(): T;

    removeLast(): T;
}
