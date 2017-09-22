import {ICollection} from './ICollection';


export interface IQueue<T> extends ICollection<T> {
    peek(): T;
    pop(): T;
}
