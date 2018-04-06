import {Collection} from './Collection';
import {ReadOnlyList} from './ReadOnlyList';


export interface List<T> extends ReadOnlyList<T>, Collection<T> {
    setAt(index: number, newValue: T): T;
    insert(index: number, item: T): boolean;
    insertAll(index: number, items: Iterable<T>): boolean;
    removeAt(index: number): T;
}
