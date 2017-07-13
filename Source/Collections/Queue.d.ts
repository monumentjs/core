import { Enumerable } from './Enumerable';
import { IEqualityComparator } from './IEqualityComparator';
export declare class Queue<T> extends Enumerable<T> {
    peek(): T;
    enqueue(item: T): void;
    dequeue(): T;
    clear(): void;
    contains(searchItem: T, comparator?: IEqualityComparator<T>): boolean;
}
