import {ICollection} from './ICollection';
import {IEnumerable} from './IEnumerable';


export interface IList<T> extends ICollection<T> {
    insert(index: number, item: T): boolean;
    insertAll(index: number, items: IEnumerable<T>): boolean;
    removeAt(index: number): T;
    indexOf(item: T): number;
    lastIndexOf(item: T): number;
    slice(offset: number, length: number): IList<T>;
}
