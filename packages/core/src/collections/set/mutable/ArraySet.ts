import {Set} from './Set';
import {ArrayList} from '../../list/mutable/ArrayList';
import {Sequence} from '../../base/Sequence';
import {Cloneable} from '../../../base/Cloneable';
import {EqualityComparator} from '../../../comparison/equality/EqualityComparator';
import {StrictEqualityComparator} from '../../../comparison/equality/StrictEqualityComparator';
import {MethodNotImplementedException} from '../../../exceptions/MethodNotImplementedException';
import {ReadOnlyCollectionBase} from '../../collection/readonly/ReadOnlyCollectionBase';
import {ReadOnlySet} from '../readonly/ReadOnlySet';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ArraySet<T> extends ReadOnlyCollectionBase<T> implements Set<T>, Cloneable<ArraySet<T>> {
    private readonly _comparator: EqualityComparator<T>;
    private readonly _items: ArrayList<T> = new ArrayList();

    public constructor(items?: Sequence<T>, comparator: EqualityComparator<T> = StrictEqualityComparator.get()) {
        super();
        this._comparator = comparator;

        if (items != null) {
            this.addAll(items);
        }
    }

    public get length(): number {
        return this._items.length;
    }

    public get comparator(): EqualityComparator<T> {
        return this._comparator;
    }

    public add(item: T): boolean {
        return this._items.addIfAbsent(item, this.comparator);
    }

    public addAll(items: Sequence<T>): boolean {
        if (items.length === 0) {
            return false;
        }

        const oldLength: number = this.length;

        for (const item of items) {
            this._items.addIfAbsent(item, this.comparator);
        }

        return this.length > oldLength;
    }

    public clear(): boolean {
        return this._items.clear();
    }

    public clone(): ArraySet<T> {
        return new ArraySet(this, this.comparator);
    }

    public intersectWith(other: Sequence<T>): boolean {
        /* tslint:disable:cyclomatic-complexity */

        let hasChanged: boolean = false;

        for (const currentItem of this) {
            let itemPresentInBothSets: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    itemPresentInBothSets = true;

                    break;
                }
            }

            if (!itemPresentInBothSets) {
                if (this.remove(currentItem)) {
                    hasChanged = true;
                }
            }
        }

        return hasChanged;
    }

    public isProperSubsetOf(other: Sequence<T>): boolean {
        if (this.length >= other.length) {
            return false;
        }

        return this.isSubsetOf(other);
    }

    public isProperSupersetOf(other: Sequence<T>): boolean {
        if (this.length <= other.length) {
            return false;
        }

        return this.isSupersetOf(other);
    }

    public isSubsetOf(other: Sequence<T>): boolean {
        let isValidSubset: boolean = true;

        for (const currentItem of this) {
            let isCurrentItemInOtherSet: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    isCurrentItemInOtherSet = true;

                    break;
                }
            }

            if (!isCurrentItemInOtherSet) {
                isValidSubset = false;

                break;
            }
        }

        return isValidSubset;
    }

    public isSupersetOf(other: Sequence<T>): boolean {
        let isValidSuperset: boolean = true;

        for (const otherItem of other) {
            let isOtherItemInCurrentSet: boolean = false;

            for (const currentItem of this) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    isOtherItemInCurrentSet = true;

                    break;
                }
            }

            if (!isOtherItemInCurrentSet) {
                isValidSuperset = false;

                break;
            }
        }

        return isValidSuperset;
    }

    public overlaps(other: ReadOnlySet<T>): boolean {
        for (const currentItem of this) {
            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    return true;
                }
            }
        }

        return false;
    }

    public remove(otherItem: T): boolean {
        return this._items.remove(otherItem, this.comparator);
    }

    public removeAll(items: Iterable<T>): boolean {
        return this._items.removeAll(items, this.comparator);
    }

    public removeBy(predicate: (item: T) => boolean): boolean {
        return this._items.removeBy(predicate);
    }

    public retainAll(items: Iterable<T>): boolean {
        return this._items.retainAll(items, this.comparator);
    }

    public setEquals(other: ReadOnlySet<T>): boolean {
        /* tslint:disable:cyclomatic-complexity */

        if (this.length !== other.length) {
            return false;
        }

        for (const otherItem of other) {
            if (!this.contains(otherItem)) {
                return false;
            }
        }

        for (const currentItem of this) {
            let currentItemInOtherCollection: boolean = false;

            for (const otherItem of other) {
                if (this.comparator.equals(currentItem, otherItem)) {
                    currentItemInOtherCollection = true;

                    break;
                }
            }

            if (!currentItemInOtherCollection) {
                return false;
            }
        }

        return true;
    }

    public symmetricExceptWith(other: Sequence<T>): boolean {
        let hasChanged: boolean = false;

        for (const otherItem of other) {
            if (this.contains(otherItem)) {
                if (this.remove(otherItem)) {
                    hasChanged = true;
                }
            } else {
                if (this.add(otherItem)) {
                    hasChanged = true;
                }
            }
        }

        return hasChanged;
    }

    public unionWith(other: Sequence<T>): boolean {
        // TODO: implement
        throw new MethodNotImplementedException('Method "unionWith" is not implemented yet');
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }
}
