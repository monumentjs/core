import { IList } from './types';
import Collection from './Collection';
export default class List<T> extends Collection<T> implements IList<T> {
    clone(): List<T>;
    insert(item: T, index: number): void;
    removeAt(index: number): T;
    indexOf(item: T): number;
    toArray(): T[];
}
