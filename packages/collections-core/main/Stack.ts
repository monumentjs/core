import {Collection} from './Collection';


export interface Stack<T> extends Collection<T> {
    push(item: T): boolean;
    peek(): T;
    pop(): T;
}
