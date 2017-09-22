import {IEnumerable} from './IEnumerable';


export interface IReadOnlyCollection<T> extends IEnumerable<T> {
    readonly isEmpty: boolean;
    contains(item: T): boolean;
    containsAll(items: IEnumerable<T>): boolean;
    toArray(): T[];
}
