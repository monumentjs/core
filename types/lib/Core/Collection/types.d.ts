export interface ICollection<T> extends Iterable<T>, ArrayLike<T> {
    add(item: T): any;
    item(index: number, item?: T): T | void;
    has(item: T): boolean;
    remove(item: T): T;
    clear(): any;
}
export interface IList<T> extends ICollection<T> {
    insert(item: T, index: number): any;
    removeAt(index: number): T;
    indexOf(item: T): number;
    toArray(): T[];
}
