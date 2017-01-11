

export interface ICollection<T> extends Iterable<T>, ArrayLike<T> {
    add(item: T);
    item(index: number, item?: T): T | void;
    has(item: T): boolean;
    remove(item: T): T;
    clear();
}


export interface IList<T> extends ICollection<T> {
    insert(item: T, index: number);
    removeAt(index: number): T;
    indexOf(item: T): number;
    toArray(): T[];
}