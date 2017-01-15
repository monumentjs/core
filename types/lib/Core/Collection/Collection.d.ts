import { ICloneable, IJSONSerializable } from '../types';
import { ICollection } from './types';
import { BaseCollection } from './BaseCollection';
export default class Collection<T> extends BaseCollection<T> implements ICloneable<Collection<T>>, ICollection<T>, IJSONSerializable<T[]> {
    constructor(list?: Iterable<T>);
    clone(): Collection<T>;
    add(item: T): void;
    item(index: number, item?: T): T | void;
    remove(item: T): T;
    clear(): void;
    has(item: T): boolean;
    toJSON(): T[];
}
