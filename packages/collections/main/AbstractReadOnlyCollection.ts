import {JSONSerializable} from '@monument/core/main/JSONSerializable';
import {Cloneable} from '@monument/core/main/Cloneable';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {AbstractEnumerable} from './AbstractEnumerable';


export abstract class AbstractReadOnlyCollection<T> extends AbstractEnumerable<T> implements ReadOnlyCollection<T>, Cloneable<ReadOnlyCollection<T>>, JSONSerializable<T[]> {

    // Cloneable interface implementation


    public abstract clone(): ReadOnlyCollection<T>;


    // Countable interface implementation


    public abstract get length(): number;


    // ReadOnlyCollection interface implementation


    public get isEmpty(): boolean {
        return this.length === 0;
    }


    public contains(otherItem: T, comparator: EqualityComparator<T> = StrictEqualityComparator.instance): boolean {
        for (let currentItem of this) {
            if (comparator.equals(currentItem, otherItem)) {
                return true;
            }
        }

        return false;
    }


    public containsAll(otherItems: Iterable<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.instance): boolean {
        for (let otherItem of otherItems) {
            if (this.contains(otherItem, comparator) === false) {
                return false;
            }
        }

        return true;
    }


    // Enumerable interface implementation


    public toArray(): T[] {
        return [...this];
    }


    public toJSON(): T[] {
        return this.toArray();
    }


    public valueOf(): T[] {
        return this.toArray();
    }
}
