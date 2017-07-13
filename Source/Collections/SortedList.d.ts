import { List } from './List';
import { IComparator } from './IComparator';
import { SortOrder } from './SortOrder';
import { IEnumerable } from './IEnumerable';
export declare class SortedList<T> extends List<T> {
    private _comparator;
    private _sortOrder;
    readonly comparator: IComparator<T>;
    readonly sortOrder: SortOrder;
    constructor(comparator: IComparator<T>, sortOrder?: SortOrder);
    add(item: T): void;
    addRange(items: IEnumerable<T>): void;
    insert(item: T, index: number): void;
    insertRange(items: IEnumerable<T>, index: number): void;
    private sortItems();
}
