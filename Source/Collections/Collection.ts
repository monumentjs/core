import {IEnumerable} from './Abstraction/IEnumerable';
import {EqualityComparator} from '../Core/EqualityComparator';
import {IteratorFunction} from './IteratorFunction';
import {ReadOnlyCollection} from './ReadOnlyCollection';
import {ICollection} from './Abstraction/ICollection';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';


export class Collection<T> extends ReadOnlyCollection<T> implements ICollection<T> {

    public clone(): Collection<T> {
        return new Collection(this);
    }


    public add(item: T): boolean {
        Array.prototype.push.call(this, item);

        return true;
    }


    public addAll(items: IEnumerable<T>): boolean {
        for (let item of items) {
            this.add(item);
        }

        return items.length > 0;
    }


    public remove(
        otherItem: T,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        let index: number = 0;

        for (let currentItem of this) {
            if (comparator.equals(otherItem, currentItem)) {
                Array.prototype.splice.call(this, index, 1);

                return true;
            }

            index++;
        }

        return false;
    }


    public removeAll(
        otherItems: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        const oldLength: number = 0;

        for (let otherItem of otherItems) {
            let index: number = 0;

            for (let currentItem of this) {
                if (comparator.equals(currentItem, otherItem)) {
                    Array.prototype.splice.call(this, index, 1);
                }

                index++;
            }
        }

        return this.length !== oldLength;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        const oldLength: number = this.length;

        for (let index = 0, actualIndex = 0; index < oldLength; index++, actualIndex++) {
            const itemMatchesPredicate: boolean = predicate(this[actualIndex] as T, index, this);

            if (itemMatchesPredicate) {
                Array.prototype.splice.call(this, actualIndex, 1);
                actualIndex--;
            }
        }

        return this.length !== oldLength;
    }


    public retainAll(
        otherItems: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        return this.removeBy((currentItem: T) => {
            let remove: boolean = true;

            for (let otherItem of otherItems) {
                if (comparator.equals(currentItem, otherItem)) {
                    remove = false;

                    break;
                }
            }

            return remove;
        });
    }


    public clear(): boolean {
        if (this.length > 0) {
            this.resize(0);

            return true;
        }

        return false;
    }
}

