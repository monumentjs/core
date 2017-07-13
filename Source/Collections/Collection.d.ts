import { ICloneable } from '../types';
import { ICollection } from './ICollection';
import { ReadOnlyCollection } from './ReadOnlyCollection';
export declare class Collection<T> extends ReadOnlyCollection<T> implements ICollection<T>, ICloneable<Collection<T>> {
    clone(): Collection<T>;
    add(item: T): void;
    remove(item: T): boolean;
    clear(): void;
}
