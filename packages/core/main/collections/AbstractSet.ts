import {EqualityComparator} from '../EqualityComparator';
import {Set} from './Set';
import {Collection} from './Collection';
import {AbstractCollection} from './AbstractCollection';


export abstract class AbstractSet<T> extends AbstractCollection<T> implements Set<T> {
    private readonly _comparator: EqualityComparator<T> | undefined;


    public get comparator(): EqualityComparator<T> | undefined {
        return this._comparator;
    }


    protected constructor(items?: Iterable<T>, comparator?: EqualityComparator<T>) {
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


    public containsAll(items: Iterable<T>): boolean {
        return super.containsAll(items, this.comparator);
    }


    public abstract remove(otherItem: T): boolean;


    public abstract removeAll(items: Iterable<T>): boolean;


    public retainAll(items: Iterable<T>): boolean {
        return super.retainAll(items, this.comparator);
    }


    public intersectWith(other: Collection<T>): boolean {
        let hasChanged: boolean = false;

        for (let currentItem of this) {
            let itemPresentInBothSets: boolean = false;

            for (let otherItem of other) {
                if (this.checkItemsEquality(currentItem, otherItem, this.comparator)) {
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


    public symmetricExceptWith(other: Collection<T>): boolean {
        let hasChanged: boolean = false;

        for (let otherItem of other) {
            if (this.remove(otherItem)) {
                hasChanged = true;
            }
        }

        for (let currentItem of this) {
            for (let otherItem of other) {
                if (this.checkItemsEquality(currentItem, otherItem, this.comparator)) {
                    if (this.remove(currentItem)) {
                        hasChanged = true;
                    }
                }
            }
        }

        return hasChanged;
    }


    public isSubsetOf(other: Collection<T>): boolean {
        let isValidSubset: boolean = true;

        for (let currentItem of this) {
            let isCurrentItemInOtherSet: boolean = false;

            for (let otherItem of other) {
                if (this.checkItemsEquality(currentItem, otherItem, this.comparator)) {
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


    public isSupersetOf(other: Collection<T>): boolean {
        let isValidSuperset: boolean = true;

        for (let otherItem of other) {
            let isOtherItemInCurrentSet: boolean = false;

            for (let currentItem of this) {
                if (this.checkItemsEquality(currentItem, otherItem, this.comparator)) {
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


    public isProperSubsetOf(other: Collection<T>): boolean {
        if (this.length >= other.length) {
            return false;
        }

        return this.isSubsetOf(other);
    }


    public isProperSupersetOf(other: Collection<T>): boolean {
        if (this.length <= other.length) {
            return false;
        }

        return this.isSupersetOf(other);
    }


    public overlaps(other: Collection<T>): boolean {
        for (let currentItem of this) {
            for (let otherItem of other) {
                if (this.checkItemsEquality(currentItem, otherItem, this.comparator)) {
                    return true;
                }
            }
        }

        return false;
    }


    public setEquals(other: Collection<T>): boolean {
        if (this.length !== other.length) {
            return false;
        }

        for (let otherItem of other) {
            if (!this.contains(otherItem)) {
                return false;
            }
        }

        for (let currentItem of this) {
            let currentItemInOtherCollection: boolean = false;

            for (let otherItem of other) {
                if (this.checkItemsEquality(currentItem, otherItem, this.comparator)) {
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
}
