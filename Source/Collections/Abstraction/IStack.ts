import {ICollection} from './ICollection';


export interface IStack<T> extends ICollection<T> {
    peek(): T;
    pop(): T;
}
