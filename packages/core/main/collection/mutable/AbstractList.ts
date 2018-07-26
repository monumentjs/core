import {EqualityComparator} from '../../EqualityComparator';
import {InvalidOperationException} from '../../exceptions/InvalidOperationException';
import {Comparator} from '../../utils/comparison/Comparator';
import {Assert} from '../../assert/Assert';
import {AbstractCollection} from './AbstractCollection';
import {List} from './List';
import {IteratorFunction} from '../IteratorFunction';
import {CombineFunction} from '../CombineFunction';
import {Grouping} from '../Grouping';
import {SortOrder} from '../SortOrder';
import {Sequence} from '../readonly/Sequence';
import {NEGATIVE_ONE, ZERO} from '../../Constants';


export abstract class AbstractList<T> extends AbstractCollection<T> implements List<T> {

    public get firstIndex(): number {
        return this.isEmpty ? NEGATIVE_ONE : ZERO;
    }

    public get lastIndex(): number {
        return this.length + NEGATIVE_ONE;
    }

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

    public all(predicate: IteratorFunction<T, boolean>): boolean {
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let allValid = true;

        this.forEach((actualItem: T, index: number): void | boolean => {
            const actualItemValid: boolean = predicate(actualItem, index);

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
            const actualItemValid: boolean = predicate(actualItem, index);

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

        const length: number = this.length;
        const sum: number = this.aggregate((total: number, actualItem: T, index: number): number => {
            const selectedValue: number = selector(actualItem, index);

            return total + selectedValue;
        }, ZERO) as number;

        return sum / length;
    }

    public concat(otherList: Sequence<T>): List<T> {
        const result: List<T> = this.createList();

        for (const item of this) {
            result.add(item);
        }

        for (const item of otherList) {
            result.add(item);
        }

        return result;
    }

    public count(predicate: IteratorFunction<T, boolean>): number {
        let count: number = ZERO;

        this.forEach((item: T, index: number): void => {
            const itemMatchesPredicate: boolean = predicate(item, index);

            if (itemMatchesPredicate) {
                count += 1;
            }
        });

        return count;
    }

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     */
    public distinct(): List<T>;
    public distinct(comparator: EqualityComparator<T>): List<T>;
    public distinct(comparator?: EqualityComparator<T>): List<T> {
        const distinctItems: List<T> = this.createList();

        this.forEach((actualItem: T): void => {
            if (comparator != null) {
                if (!distinctItems.contains(actualItem, comparator)) {
                    distinctItems.add(actualItem);
                }
            } else {
                if (!distinctItems.contains(actualItem)) {
                    distinctItems.add(actualItem);
                }
            }
        });

        return distinctItems;
    }

    public except(otherList: Sequence<T>): List<T>;
    public except(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public except(otherList: Sequence<T>, comparator?: EqualityComparator<T>): List<T> {
        const difference: List<T> = this.createList();

        for (const actualItem of this) {
            let contains: boolean = false;

            for (const otherItem of otherList) {
                if (this.checkEquality(actualItem, otherItem, comparator)) {
                    contains = true;

                    break;
                }
            }

            if (!contains) {
                difference.add(actualItem);
            }
        }

        for (const otherItem of otherList) {
            for (const actualItem of this) {
                if (!this.checkEquality(actualItem, otherItem, comparator)) {
                    difference.add(otherItem);

                    break;
                }
            }
        }

        return difference;
    }

    public findAll(predicate: IteratorFunction<T, boolean>): List<T> {
        return this.aggregate((
            filteredList: List<T>,
            actualItem: T,
            index: number
        ): List<T> => {
            const matches: boolean = predicate(actualItem, index);

            if (matches) {
                filteredList.add(actualItem);
            }

            return filteredList as List<T>;
        }, this.createList());
    }

    public first(predicate: IteratorFunction<T, boolean>): T | undefined;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;
    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        let index = ZERO;

        for (const actualItem of this) {
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }

            index++;
        }

        return defaultValue;
    }

    public firstOrDefault(defaultValue: T): T {
        if (this.length > ZERO) {
            return this.getAt(ZERO);
        } else {
            return defaultValue;
        }
    }

    public abstract forEach(iterator: IteratorFunction<T, boolean | void>): void;
    public abstract forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public abstract forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public abstract forEachReversed(iterator: IteratorFunction<T, boolean | void>): void;
    public abstract forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public abstract forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;

    public abstract getAt(index: number): T;

    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>): List<Grouping<TKey, T>>;
    public groupBy<TKey>(keySelector: IteratorFunction<T, TKey>, keyComparator: EqualityComparator<TKey>): List<Grouping<TKey, T>>;
    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator?: EqualityComparator<TKey>
    ): List<Grouping<TKey, T>> {
        const allKeys: List<TKey> = this.map((item: T, index: number) => {
            return keySelector(item, index);
        });
        const keys: List<TKey> = keyComparator ? allKeys.distinct(keyComparator) : allKeys;
        const groups: List<Grouping<TKey, T>> = this.createList();

        for (const key of keys) {
            const items: List<T> = this.findAll((item: T, index: number): boolean => {
                const otherKey: TKey = keySelector(item, index);

                return this.checkEquality(key, otherKey, keyComparator);
            });
            const group: Grouping<TKey, T> = new Grouping(key, items);

            groups.add(group);
        }

        return groups;
    }

    public abstract indexOf(item: T): number;
    public abstract indexOf(item: T, comparator: EqualityComparator<T>): number;
    public abstract indexOf(item: T, startIndex: number): number;
    public abstract indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;
    public abstract indexOf(item: T, startIndex: number, count: number): number;
    public abstract indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    public abstract insert(index: number, item: T): boolean;

    public abstract insertAll(index: number, items: Sequence<T>): boolean;

    public intersect(otherList: Sequence<T>): List<T>;
    public intersect(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public intersect(
        otherList: Sequence<T>,
        comparator?: EqualityComparator<T>
    ): List<T> {
        const intersection: List<T> = this.createList();

        this.forEach((actualItem: T) => {
            for (const otherItem of otherList) {
                if (this.checkEquality(actualItem, otherItem, comparator)) {
                    intersection.add(actualItem);
                }
            }
        });

        return intersection;
    }

    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>
    ): List<TResult>;
    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: EqualityComparator<TKey>
    ): List<TResult>;
    public join<TOuter, TKey, TResult>(
        outerList: Sequence<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator?: EqualityComparator<TKey>
    ): List<TResult> {
        const listOfJoinedItems: List<TResult> = this.createList();

        this.forEach((innerItem: T, innerIndex: number): void => {
            const innerKey: TKey = innerKeySelector(innerItem, innerIndex);
            let outerIndex: number = ZERO;

            for (const outerItem of outerList) {
                const outerKey: TKey = outerKeySelector(outerItem, outerIndex);

                if (this.checkEquality(innerKey, outerKey, keyComparator)) {
                    listOfJoinedItems.add(resultSelector(innerItem, outerItem));
                }

                outerIndex += 1;
            }
        });

        return listOfJoinedItems;
    }

    public last(predicate: IteratorFunction<T, boolean>): T | undefined;
    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T): T;
    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        for (let index = this.lastIndex; index >= ZERO; index--) {
            const actualItem: T = this.getAt(index);
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }

    public abstract lastIndexOf(item: T): number;
    public abstract lastIndexOf(item: T, comparator: EqualityComparator<T>): number;
    public abstract lastIndexOf(item: T, startIndex: number): number;
    public abstract lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;
    public abstract lastIndexOf(item: T, startIndex: number, count: number): number;
    public abstract lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;

    public lastOrDefault(defaultValue: T): T {
        if (this.length > ZERO) {
            return this.getAt(this.lastIndex);
        } else {
            return defaultValue;
        }
    }

    public map<TResult>(selector: IteratorFunction<T, TResult>): List<TResult> {
        return this.aggregate((
            mappedList: List<TResult>,
            actualItem: T,
            index: number
        ): List<TResult> => {
            mappedList.add(selector(actualItem, index));

            return mappedList;
        }, this.createList<TResult>());
    }

    public max(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((maxValue: number, actualItem: T, index: number): number => {
            const itemValue: number = selector(actualItem, index);

            if (index === ZERO) {
                return itemValue;
            }

            return Math.max(maxValue, itemValue);
        }, ZERO);
    }

    public min(selector: IteratorFunction<T, number>): number {
        if (this.isEmpty) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((minValue: number, actualItem: T, index: number): number => {
            const itemValue: number = selector(actualItem, index);

            if (index === ZERO) {
                return itemValue;
            }

            return Math.min(minValue, itemValue);
        }, ZERO);
    }

    public orderBy<TKey>(
        keySelector: (item: T) => TKey,
        comparator: Comparator<TKey>,
        sortOrder: SortOrder = SortOrder.ASCENDING
    ): List<T> {
        return this.createList(this.toArray().sort((x: T, y: T): number => {
            const xKey: TKey = keySelector(x);
            const yKey: TKey = keySelector(y);

            return comparator.compare(xKey, yKey) * sortOrder;
        }));
    }

    public abstract removeAt(index: number): T;

    public reverse(): List<T> {
        const reversedList: List<any> = this.createList();

        for (const item of this) {
            reversedList.insert(ZERO, item);
        }

        return reversedList;
    }

    public selectMany<TInnerItem, TResult>(
        sequenceSelector: IteratorFunction<T, Sequence<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>
    ): List<TResult> {
        const resultList: List<TResult> = this.createList();
        const collections: List<Sequence<TInnerItem>> = this.map<Sequence<TInnerItem>>((
            actualItem: T,
            actualItemIndex: number
        ): Sequence<TInnerItem> => {
            return sequenceSelector(actualItem, actualItemIndex);
        });

        let index: number = ZERO;

        // TODO: use two iterators
        for (const collection of collections) {
            const actualItem: T = this.getAt(index);

            for (const innerItem of collection) {
                resultList.add(resultSelector(actualItem, innerItem));
            }

            index += 1;
        }

        return resultList;
    }

    public abstract setAt(index: number, newValue: T): T;

    public skip(offset: number): List<T> {
        if (offset !== ZERO) {
            Assert.argument('offset', offset).isIndexOf(this);
        }

        const result: List<T> = this.createList();
        let index: number = ZERO;

        for (const item of this) {
            if (index >= offset) {
                result.add(item);
            }

            index++;
        }

        return result;
    }

    public skipWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        let offset: number = ZERO;

        this.forEach((actualItem: T, index: number): boolean | void => {
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                offset += 1;
            } else {
                return false;
            }
        });

        return this.skip(offset);
    }

    public slice(offset: number): List<T>;
    public slice(offset: number, length: number): List<T>;
    public slice(offset: number, length: number = this.length - offset): List<T> {
        this.validateSliceBounds(offset, length);

        const slice: List<T> = this.createList();
        const maxIndex: number = offset + length;
        let index: number = ZERO;

        for (const item of this) {
            if (index >= maxIndex) {
                break;
            }

            if (index >= offset) {
                slice.add(item);
            }

            index++;
        }

        return slice;
    }

    public take(length: number): List<T> {
        Assert.argument('length', this.length).isLength();
        this.validateSliceRange(ZERO, length);

        const result: List<T> = this.createList();
        let index: number = ZERO;

        for (const item of this) {
            if (index >= length) {
                break;
            }

            result.add(item);

            index++;
        }

        return result;
    }

    public takeWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        let length: number = ZERO;

        this.forEach((actualItem: T, index: number): boolean | void => {
            const actualItemMatchesPredicate: boolean = predicate(actualItem, index);

            if (actualItemMatchesPredicate) {
                length += 1;
            } else {
                return false;
            }
        });

        return this.take(length);
    }

    public union(otherList: Sequence<T>): List<T>;
    public union(otherList: Sequence<T>, comparator: EqualityComparator<T>): List<T>;
    public union(otherList: Sequence<T>, comparator?: EqualityComparator<T>): List<T> {
        const union: List<T> = this.createList(this);

        for (const otherItem of otherList) {
            if (comparator != null) {
                if (!union.contains(otherItem, comparator)) {
                    union.add(otherItem);
                }
            } else {
                if (!union.contains(otherItem)) {
                    union.add(otherItem);
                }
            }
        }

        return union;
    }

    public zip<TOther, TResult>(
        otherList: Sequence<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): List<TResult> {
        const minLength: number = Math.min(this.length, otherList.length);
        const resultList: List<TResult> = this.createList();

        if (minLength === ZERO) {
            return resultList;
        }

        let index: number = ZERO;

        for (const otherItem of otherList) {
            const actualItem: T = this.getAt(index);
            const result: TResult = resultSelector(actualItem, otherItem);

            resultList.add(result);

            index++;

            if (index >= minLength) {
                break;
            }
        }

        return resultList;
    }

    protected abstract createList<TItem>(items?: Sequence<TItem>, comparator?: EqualityComparator<TItem>): List<TItem>;
}
