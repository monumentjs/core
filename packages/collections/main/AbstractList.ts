import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';
import {Comparator} from '@monument/core/main/Comparator';
import {Assert} from '@monument/assert/main/Assert';
import {AbstractCollection} from './AbstractCollection';
import {List} from './List';
import {IteratorFunction} from './IteratorFunction';
import {CombineFunction} from './CombineFunction';
import {Grouping} from './Grouping';
import {Collection} from './Collection';
import {SortOrder} from './SortOrder';


export abstract class AbstractList<T> extends AbstractCollection<T> implements List<T> {

    public abstract clone(): List<T>;


    public abstract getAt(index: number): T;


    public abstract setAt(index: number, newValue: T): T;


    public abstract insert(index: number, item: T): boolean;


    public abstract insertAll(index: number, items: Iterable<T>): boolean;


    public abstract removeAt(index: number): T;


    public abstract indexOf(item: T): number;


    public abstract lastIndexOf(item: T): number;


    public aggregate<TAggregate>(
        iterator: (lastSeed: TAggregate, item: T, index: number) => TAggregate,
        initialSeed: TAggregate
    ): TAggregate {
        let lastSeed: TAggregate = initialSeed;

        this.forEach((actualItem: T, index: number) => {
            lastSeed = iterator(lastSeed, actualItem, index);
        });

        return lastSeed;
    }


    public select<TResult>(selector: IteratorFunction<T, TResult>): List<TResult> {
        return this.aggregate((
            mappedList: List<TResult>,
            actualItem: T,
            index: number
        ): List<TResult> => {
            mappedList.add(selector(actualItem, index));

            return mappedList;
        }, this.createList<TResult>());
    }


    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, List<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>,
    ): List<TResult> {
        let resultList: List<TResult> = this.createList();
        let collections: List<List<TInnerItem>> = this.select<List<TInnerItem>>((
            actualItem: T,
            actualItemIndex: number
        ): List<TInnerItem> => {
            return collectionSelector(actualItem, actualItemIndex);
        });

        let index: number = 0;

        for (let collection of collections) {
            let actualItem: T = this.getAt(index);

            for (let innerItem of collection) {
                resultList.add(resultSelector(actualItem, innerItem));
            }

            index += 1;
        }

        return resultList;
    }


    public where(predicate: IteratorFunction<T, boolean>): List<T> {
        return this.aggregate((
            filteredList: List<T>,
            actualItem: T,
            index: number
        ): List<T> => {
            let matches: boolean = predicate(actualItem, index);

            if (matches) {
                filteredList.add(actualItem);
            }

            return filteredList as List<T>;
        }, this.createList());
    }


    public all(predicate: IteratorFunction<T, boolean>): boolean {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let allValid = true;

        this.forEach((actualItem: T, index: number): void | boolean => {
            let actualItemValid: boolean = predicate(actualItem, index);

            if (!actualItemValid) {
                allValid = false;

                return false;
            }
        });

        return allValid;
    }


    public any(predicate: IteratorFunction<T, boolean>): boolean {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let atLeastOneValid: boolean = false;

        this.forEach((actualItem: T, index: number): void | boolean => {
            let actualItemValid: boolean = predicate(actualItem, index);

            if (actualItemValid) {
                atLeastOneValid = true;

                return false;
            }
        });

        return atLeastOneValid;
    }


    public average(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let length: number = this.length;
        let sum: number;

        sum = this.aggregate((total: number, actualItem: T, index: number): number => {
            let selectedValue: number = selector(actualItem, index);

            return total + selectedValue;
        }, 0) as number;

        return sum / length;
    }


    public count(predicate: IteratorFunction<T, boolean>): number {
        let count: number = 0;

        this.forEach((item: T, index: number): void => {
            let itemMatchesPredicate: boolean = predicate(item, index);

            if (itemMatchesPredicate) {
                count += 1;
            }
        });

        return count;
    }


    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        for (let index = 0; index < this.length; index++) {
            let actualItem: T = this.getAt(index);
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }


    public firstOrDefault(defaultValue: T): T {
        if (this.length > 0) {
            return this.getAt(0);
        } else {
            return defaultValue;
        }
    }


    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        for (let index = this.length - 1; index >= 0; index--) {
            let actualItem: T = this.getAt(index);
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }


    public lastOrDefault(defaultValue: T): T {
        if (this.length > 0) {
            return this.getAt(this.length - 1);
        } else {
            return defaultValue;
        }
    }


    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     * @param comparator
     */
    public distinct(comparator: EqualityComparator<T> = StrictEqualityComparator.instance): List<T> {
        let distinctItems: List<T> = this.createList();

        this.forEach((actualItem: T): void => {
            if (!distinctItems.contains(actualItem, comparator)) {
                distinctItems.add(actualItem);
            }
        });

        return distinctItems;
    }


    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: EqualityComparator<TKey> = StrictEqualityComparator.instance
    ): List<Grouping<TKey, T>> {
        let keys: List<TKey> = this.select((item: T, index: number) => {
            return keySelector(item, index);
        }).distinct(keyComparator);
        let groups: List<Grouping<TKey, T>> = this.createList();

        for (let key of keys) {
            let items: Collection<T> = this.where((item: T, index: number): boolean => {
                return keyComparator.equals(key, keySelector(item, index));
            });
            let group: Grouping<TKey, T> = new Grouping(key, items);

            groups.add(group);
        }

        return groups;
    }


    public except(
        otherList: List<T>,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): List<T> {
        let difference: List<T> = this.createList();

        this.forEach((actualItem: T) => {
            if (!otherList.contains(actualItem, comparator)) {
                difference.add(actualItem);
            }
        });

        for (let otherItem of otherList) {
            if (!this.contains(otherItem, comparator)) {
                difference.add(otherItem);
            }
        }

        return difference;
    }


    public intersect(
        otherList: List<T>,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): List<T> {
        let intersection: List<T> = this.createList();

        this.forEach((actualItem: T) => {
            if (otherList.contains(actualItem, comparator)) {
                intersection.add(actualItem);
            }
        });

        return intersection;
    }


    public join<TOuter, TKey, TResult>(
        outerList: List<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey> = StrictEqualityComparator.instance
    ): List<TResult> {
        let listOfJoinedItems: List<TResult> = this.createList();

        this.forEach((innerItem: T, innerIndex: number): void => {
            let innerKey: TKey = innerKeySelector(innerItem, innerIndex);
            let outerIndex: number = 0;

            for (let outerItem of outerList) {
                let outerKey: TKey = outerKeySelector(outerItem, outerIndex);

                if (keyComparator.equals(innerKey, outerKey)) {
                    listOfJoinedItems.add(resultSelector(innerItem, outerItem));
                }

                outerIndex += 1;
            }
        });

        return listOfJoinedItems;
    }


    public min(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((minValue: number, actualItem: T, index: number): number => {
            let itemValue: number = selector(actualItem, index);

            if (index === 0) {
                return itemValue;
            }

            return Math.min(minValue, itemValue);
        }, 0);
    }


    public max(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((maxValue: number, actualItem: T, index: number): number => {
            let itemValue: number = selector(actualItem, index);

            if (index === 0) {
                return itemValue;
            }

            return Math.max(maxValue, itemValue);
        }, 0);
    }


    public orderBy<TKey>(
        keySelector: (item: T) => TKey,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder = SortOrder.ASCENDING
    ): List<T> {
        return this.createList(this.toArray().sort((x: T, y: T): number => {
            let xKey: TKey = keySelector(x);
            let yKey: TKey = keySelector(y);

            return comparator.compare(xKey, yKey) * sortOrder;
        }));
    }


    public reverse(): List<T> {
        let reversedList: List<any> = this.createList();

        for (let item of this) {
            reversedList.insert(0, item);
        }

        return reversedList;
    }


    public skip(offset: number): List<T> {
        if (offset !== 0) {
            Assert.argument('offset', offset).isIndexOf(this);
        }

        let result: List<T> = this.createList();
        let index: number = 0;

        for (let item of this) {
            if (index >= offset) {
                result.add(item);
            }

            index++;
        }

        return result;
    }


    public skipWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        let offset: number = 0;

        this.forEach((actualItem: T, index: number): boolean | void => {
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                offset += 1;
            } else {
                return false;
            }
        });

        return this.skip(offset);
    }


    public take(length: number): List<T> {
        Assert.argument('length', this.length).isLength();
        Assert.sequence(this).containsSlice(0, length);

        let result: List<T> = this.createList();
        let index: number = 0;

        for (let item of this) {
            if (index >= length) {
                break;
            }

            result.add(item);

            index++;
        }

        return result;
    }


    public takeWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        let length: number = 0;

        this.forEach((actualItem: T, index: number): boolean | void => {
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                length += 1;
            } else {
                return false;
            }
        });

        return this.take(length);
    }


    public slice(startIndex: number, count: number): List<T> {
        this.validateSliceBounds(startIndex, count);

        let result: List<T> = this.createList();
        let maxIndex: number = startIndex + count;
        let index: number = 0;

        for (let item of this) {
            if (index >= maxIndex) {
                break;
            }

            if (index >= startIndex) {
                result.add(item);
            }

            index++;
        }

        return result;
    }


    public concat(otherList: List<T>): List<T> {
        let result: List<T> = this.createList();

        for (let item of this) {
            result.add(item);
        }

        for (let item of otherList) {
            result.add(item);
        }

        return result;
    }


    public union(
        otherList: List<T>,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): List<T> {
        return otherList.aggregate((union: List<T>, otherItem: T): List<T> => {
            if (!union.contains(otherItem, comparator)) {
                union.add(otherItem);
            }

            return union;
        }, this.clone()) as List<T>;
    }


    public zip<TOther, TResult>(
        otherList: List<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): List<TResult> {
        let minLength: number = Math.min(this.length, otherList.length);
        let resultList: List<TResult> = this.createList();

        for (let index = 0; index < minLength; index++) {
            let actualItem: T = this.getAt(index);
            let otherItem: TOther = otherList.getAt(index);
            let result: TResult = resultSelector(actualItem, otherItem);

            resultList.add(result);
        }

        return resultList;
    }


    protected abstract createList<TItem>(items?: Iterable<TItem>, comparator?: EqualityComparator<TItem>): List<TItem>;
}
