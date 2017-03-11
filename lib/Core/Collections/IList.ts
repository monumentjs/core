import {ICollection} from './ICollection';
import {IEnumerable} from './IEnumerable';
import {IteratorFunction} from './types';


export interface IList<T> extends ICollection<T> {
    insert(item: T, index: number): void;
    insertRange(items: IEnumerable<T>, index: number): void;
    removeAt(index: number): void;
    removeBy(predicate: IteratorFunction<T, boolean>): void;
    removeAll(items: IEnumerable<T>): void;
    indexOf(item: T): number;
    slice(offset: number, length: number): IEnumerable<T>;
}