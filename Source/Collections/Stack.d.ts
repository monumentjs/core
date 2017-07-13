import { Enumerable } from './Enumerable';
import { IEqualityComparator } from './IEqualityComparator';
export declare class Stack<T> extends Enumerable<T> {
    peek(): T;
    push(item: T): void;
    pop(): T;
    clear(): void;
    contains(searchItem: T, comparator?: IEqualityComparator<T>): boolean;
}
