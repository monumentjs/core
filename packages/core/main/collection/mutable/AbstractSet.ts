import {EqualityComparator} from '../../EqualityComparator';
import {Set} from './Set';
import {AbstractCollection} from './AbstractCollection';
import {Sequence} from '../readonly/Sequence';
import {StrictEqualityComparator} from '../../utils/comparison/StrictEqualityComparator';


export abstract class AbstractSet<T> extends AbstractCollection<T> implements Set<T> {
    private readonly _comparator: EqualityComparator<T>;

    public get comparator(): EqualityComparator<T> {
        return this._comparator;
    }

    protected constructor(items?: Sequence<T>, comparator: EqualityComparator<T> = new StrictEqualityComparator()) {
        super();

        this._comparator = comparator;

        if (items != null) {
            this.addAll(items);
        }
    }

    public abstract add(item: T): boolean;

    public contains(item: T): boolean {
        return super.contains(item, this.comparator);
    }

    public containsAll(items: Sequence<T>): boolean {
        return super.containsAll(items, this.comparator);
    }

    public intersectWith(other: Sequence<T>): boolean {
        let hasChanged: boolean = false;

        for (const currentItem of this) {
            let itemPresentInBothSets: boolean = false;

            for (const otherItem of other) {
                if (this.checkEquality(currentItem, otherItem, this.comparator)) {
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
                if (this.checkEquality(currentItem, otherItem, this.comparator)) {
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
                if (this.checkEquality(currentItem, otherItem, this.comparator)) {
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

    public overlaps(other: Sequence<T>): boolean {
        for (const currentItem of this) {
            for (const otherItem of other) {
                if (this.checkEquality(currentItem, otherItem, this.comparator)) {
                    return true;
                }
            }
        }

        return false;
    }

    public abstract remove(otherItem: T): boolean;

    public abstract removeAll(items: Sequence<T>): boolean;

    public retainAll(items: Sequence<T>): boolean {
        if (this.comparator != null) {
            return super.retainAll(items, this.comparator);
        } else {
            return super.retainAll(items);
        }
    }

    public setEquals(other: Sequence<T>): boolean {
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
                if (this.checkEquality(currentItem, otherItem, this.comparator)) {
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
            if (this.remove(otherItem)) {
                hasChanged = true;
            }
        }

        for (const currentItem of this) {
            for (const otherItem of other) {
                if (this.checkEquality(currentItem, otherItem, this.comparator)) {
                    if (this.remove(currentItem)) {
                        hasChanged = true;
                    }
                }
            }
        }

        return hasChanged;
    }
}
