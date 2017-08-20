import {IComparator} from './IComparator';
import {IEquatable} from '../types';
import {IEqualityComparator} from './IEqualityComparator';
import {IEnumerable} from './IEnumerable';
import {IList} from './IList';
import {IQueryable} from './IQueryable';
import {SortOrder} from './SortOrder';
import {CombineFunction, IteratorFunction} from './types';
import {Collection} from './Collection';
import {EqualityComparator} from './EqualityComparator';
import {Grouping} from './Grouping';
import {InvalidOperationException} from '../Exceptions/InvalidOperationException';
import {Assert} from '../Assertion/Assert';
import {IndexOutOfBoundsException} from '../Exceptions/IndexOutOfBoundsException';


export class List<T> extends Collection<T> implements IList<T>, IQueryable<T>, IEquatable<IList<T>> {
    public static range(start: number, end: number, step: number = 1): List<number> {
        Assert.argument('start', start).notNull();
        Assert.argument('end', end).notNull();
        Assert.argument('step', step).notNull();
        Assert.range(start, end).bounds();

        let numbersList: List<number> = new List<number>();

        for (let num = start; num < end; num += step) {
            numbersList.add(num);
        }

        return numbersList;
    }


    public static repeat<TValue>(value: TValue, times: number): List<TValue> {
        Assert.argument('times', times).notNull().isLength();

        let list: List<TValue> = new List<TValue>();

        for (let index = 0; index < times; index++) {
            list.add(value);
        }

        return list;
    }


    public static generate<TValue>(generator: (index: number) => TValue, length: number): List<TValue> {
        Assert.argument('generator', generator).notNull();
        Assert.argument('length', length).notNull().isLength();

        let list: List<TValue> = new List<TValue>();

        for (let i = 0; i < length; i++) {
            list.add(generator(i));
        }

        return list;
    }


    public clone(): List<T> {
        return new List<T>(this);
    }


    // IList<TItem> interface implementation


    public addRange(items: IEnumerable<T>): void {
        Array.prototype.push.call(this, ...items);
    }


    public insert(item: T, index: number): void {
        Assert.argument('index', index).notNull().isIndex();

        if (index > this.length) {
            throw new IndexOutOfBoundsException(
                `Invalid argument 'index': ` +
                `Index (${index}) is out of bounds [0, ${this.length}).`
            );
        }

        Array.prototype.splice.call(this, index, 0, item);
    }


    public insertRange(items: IEnumerable<T>, index: number): void {
        Assert.argument('items', items).notNull();
        Assert.argument('index', index).notNull().isIndex();

        if (index > this.length) {
            throw new IndexOutOfBoundsException(
                `Invalid argument 'index': ` +
                `Index (${index}) is out of bounds [0, ${this.length}).`
            );
        }

        Array.prototype.splice.call(this, index, 0, ...items);
    }


    public removeAt(index: number): void {
        Assert.argument('index', index).notNull().indexBounds(0, this.length);

        Array.prototype.splice.call(this, index, 1);
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): void {
        Assert.argument('predicate', predicate).notNull();

        this.forEach((item: T, index: number, list: IEnumerable<T>): void => {
            let itemMatchesPredicate: boolean = predicate(item, index, list);

            if (itemMatchesPredicate) {
                this.removeAt(index);
            }
        });
    }


    public removeAll(
        other: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): void {
        Assert.argument('other', other).notNull();
        Assert.argument('comparator', comparator).notNull();

        for (let otherItem of other) {
            this.removeBy((currentItem: T): boolean => {
                return comparator.equals(currentItem, otherItem);
            });
        }
    }


    public indexOf(
        searchItem: T,
        startIndex: number = 0,
        count: number = this.length - startIndex,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): number {
        Assert.argument('startIndex', startIndex).notNull().isIndex();
        if (startIndex !== 0) {
            Assert.argument('startIndex', startIndex).isIndexOf(this);
        }
        Assert.argument('count', count).notNull().isLength();
        Assert.argument('comparator', comparator).notNull();
        Assert.sequence(this).containsSlice(startIndex, count);

        for (let index: number = startIndex; index < startIndex + count; index++) {
            let currentItem: T = this[index];

            if (comparator.equals(searchItem, currentItem)) {
                return index;
            }
        }

        return -1;
    }


    // IQueryable<TItem> interface implementation


    public forEach(iterator: IteratorFunction<T, boolean | void>): void {
        Assert.argument('iterator', iterator).notNull();

        let index: number = 0;

        for (let actualItem of this) {
            let shouldBreakLoop: boolean = iterator(actualItem, index, this) === false;

            index += 1;

            if (shouldBreakLoop) {
                break;
            }
        }
    }


    public aggregate<TAggregate>(
        iterator: (lastSeed: TAggregate | null, item: T, index: number, list: IEnumerable<T>) => TAggregate,
        initialSeed: TAggregate | null = null
    ): TAggregate | null {
        Assert.argument('iterator', iterator).notNull();

        let lastSeed: TAggregate | null = initialSeed;

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            lastSeed = iterator(lastSeed, actualItem, index, list);
        });

        return lastSeed;
    }


    public select<TResult>(selector: IteratorFunction<T, TResult>): List<TResult> {
        Assert.argument('selector', selector).notNull();

        return this.aggregate<List<TResult>>((
            mappedList: List<TResult>,
            actualItem: T,
            index: number,
            list: IEnumerable<T>
        ): List<TResult> => {
            mappedList.add(selector(actualItem, index, list));

            return mappedList;
        }, new List<TResult>()) as List<TResult>;
    }


    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, IEnumerable<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>,
    ): List<TResult> {
        Assert.argument('collectionSelector', collectionSelector).notNull();
        Assert.argument('resultSelector', resultSelector).notNull();

        let resultList: List<TResult> = new List<TResult>();
        let collections: IEnumerable<IEnumerable<TInnerItem>> = this.select<IEnumerable<TInnerItem>>((
            actualItem: T,
            actualItemIndex: number,
            list: IEnumerable<T>
        ): IEnumerable<TInnerItem> => {
            return collectionSelector(actualItem, actualItemIndex, list);
        });

        let index: number = 0;

        for (let collection of collections) {
            let actualItem: T = this[index];

            for (let innerItem of collection) {
                resultList.add(resultSelector(actualItem, innerItem));
            }

            index += 1;
        }

        return resultList;
    }


    public where(predicate: IteratorFunction<T, boolean>): List<T> {
        Assert.argument('predicate', predicate).notNull();

        return this.aggregate((
            filteredList: List<T>,
            actualItem: T,
            index: number,
            list: List<T>
        ): List<T> => {
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index, list);

            if (actualItemMatchesPredicate) {
                filteredList.add(actualItem);
            }

            return filteredList;
        }, new List<T>()) as List<T>;
    }


    public all(predicate: IteratorFunction<T, boolean>): boolean {
        Assert.argument('predicate', predicate).notNull();

        if (this.length === 0) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let allValid = true;

        this.forEach((actualItem: T, index: number, list: List<T>): void|boolean => {
            let actualItemValid: boolean = predicate(actualItem, index, list);

            if (!actualItemValid) {
                allValid = false;

                return false;
            }
        });

        return allValid;
    }


    public any(predicate: IteratorFunction<T, boolean>): boolean {
        Assert.argument('predicate', predicate).notNull();

        if (this.length === 0) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let atLeastOneValid: boolean = false;

        this.forEach((actualItem: T, index: number, list: List<T>): void|boolean => {
            let actualItemValid: boolean = predicate(actualItem, index, list);

            if (actualItemValid) {
                atLeastOneValid = true;

                return false;
            }
        });

        return atLeastOneValid;
    }


    public average(selector: IteratorFunction<T, number>): number {
        Assert.argument('selector', selector).notNull();

        if (this.length === 0) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let length: number = this.length;
        let sum: number;

        sum = this.aggregate((total: number, actualItem: T, index: number, list: List<T>): number => {
            let selectedValue: number = selector(actualItem, index, list);

            return total + selectedValue;
        }, 0) as number;

        return sum / length;
    }


    public count(predicate: IteratorFunction<T, boolean>): number {
        Assert.argument('predicate', predicate).notNull();

        let count: number = 0;

        this.forEach((item: T, index: number, list: List<T>): void => {
            let itemMatchesPredicate: boolean = predicate(item, index, list);

            if (itemMatchesPredicate) {
                count += 1;
            }
        });

        return count;
    }


    public first(predicate: IteratorFunction<T, boolean>, defaultValue: T | null = null): T | null {
        Assert.argument('predicate', predicate).notNull();

        for (let index = 0; index < this.length; index++) {
            let actualItem: T = this[index];
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index, this);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }


    public firstOrDefault(defaultValue: T): T {
        if (this.length > 0) {
            return this[0];
        } else {
            return defaultValue;
        }
    }


    public last(predicate: IteratorFunction<T, boolean>, defaultValue: T | null = null): T | null {
        Assert.argument('predicate', predicate).notNull();

        for (let index = this.length - 1; index >= 0; index--) {
            let actualItem: T = this[index];
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index, this);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }


    public lastOrDefault(defaultValue: T): T {
        if (this.length > 0) {
            return this[this.length - 1];
        } else {
            return defaultValue;
        }
    }

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     * @param comparator
     */
    public distinct(comparator: IEqualityComparator<T> = EqualityComparator.instance): List<T> {
        Assert.argument('comparator', comparator).notNull();

        let distinctItems: List<T> = new List<T>();

        this.forEach((actualItem: T): void => {
            if (!distinctItems.contains(actualItem, comparator)) {
                distinctItems.add(actualItem);
            }
        });

        return distinctItems;
    }


    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparator: IEqualityComparator<TKey> = EqualityComparator.instance
    ): List<Grouping<TKey, T>> {
        Assert.argument('keySelector', keySelector).notNull();
        Assert.argument('keyComparator', keyComparator).notNull();

        let groups: List<Grouping<TKey, T>> = new List<Grouping<TKey, T>>();

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            let actualItemKey: TKey = keySelector(actualItem, index, list);
            let correspondingGroup: Grouping<TKey, T> | null = groups.first((group: Grouping<TKey, T>): boolean => {
                return keyComparator.equals(actualItemKey, group.key);
            });

            if (correspondingGroup == null) {
                correspondingGroup = new Grouping<TKey, T>(actualItemKey);

                groups.add(correspondingGroup);
            }

            correspondingGroup.add(actualItem);
        });

        return groups;
    }


    public except(
        otherList: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): List<T> {
        Assert.argument('otherList', otherList).notNull();
        Assert.argument('comparator', comparator).notNull();

        let difference: List<T> = new List<T>();

        this.forEach((actualItem: T) => {
            if (!Collection.prototype.contains.call(otherList, actualItem, comparator)) {
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
        otherList: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): List<T> {
        Assert.argument('otherList', otherList).notNull();
        Assert.argument('comparator', comparator).notNull();

        let intersection: List<T> = new List<T>();

        this.forEach((actualItem: T) => {
            if (Collection.prototype.contains.call(otherList, actualItem, comparator)) {
                intersection.add(actualItem);
            }
        });

        return intersection;
    }


    public join<TOuter, TKey, TResult>(
        outerList: IEnumerable<TOuter>,
        outerKeySelector: IteratorFunction<TOuter, TKey>,
        innerKeySelector: IteratorFunction<T, TKey>,
        resultSelector: CombineFunction<T, TOuter, TResult>,
        keyComparator: IEqualityComparator<TKey> = EqualityComparator.instance
    ): List<TResult> {
        Assert.argument('outerList', outerList).notNull();
        Assert.argument('outerKeySelector', outerKeySelector).notNull();
        Assert.argument('innerKeySelector', innerKeySelector).notNull();
        Assert.argument('resultSelector', resultSelector).notNull();
        Assert.argument('keyComparator', keyComparator).notNull();

        let listOfJoinedItems: List<TResult> = new List<TResult>();

        this.forEach((innerItem: T, innerIndex: number, innerList: List<T>): void => {
            let innerKey: TKey = innerKeySelector(innerItem, innerIndex, innerList);
            let outerIndex: number = 0;

            for (let outerItem of outerList) {
                let outerKey: TKey = outerKeySelector(outerItem, outerIndex, outerList);

                if (keyComparator.equals(innerKey, outerKey)) {
                    listOfJoinedItems.add(resultSelector(innerItem, outerItem));
                }

                outerIndex += 1;
            }
        });

        return listOfJoinedItems;
    }


    public min(selector: IteratorFunction<T, number>): number {
        Assert.argument('selector', selector).notNull();

        if (this.length === 0) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((minValue: number, actualItem: T, index: number): number => {
            let itemValue: number = selector(actualItem, index, this);

            if (index === 0) {
                return itemValue;
            }

            return Math.min(minValue, itemValue);
        }) as number;
    }


    public max(selector: IteratorFunction<T, number>): number {
        Assert.argument('selector', selector).notNull();

        if (this.length === 0) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((maxValue: number, actualItem: T, index: number): number => {
            let itemValue: number = selector(actualItem, index, this);

            if (index === 0) {
                return itemValue;
            }

            return Math.max(maxValue, itemValue);
        }) as number;
    }


    public orderBy<TKey>(
        keySelector: (item: T) => TKey,
        comparator: IComparator<TKey>,
        sortOrder: SortOrder = SortOrder.Ascending
    ): List<T> {
        Assert.argument('keySelector', keySelector).notNull();
        Assert.argument('comparator', comparator).notNull();
        Assert.argument('sortOrder', sortOrder).notNull();

        return new List<T>(this.toArray().sort((x: T, y: T): number => {
            let xKey: TKey = keySelector(x);
            let yKey: TKey = keySelector(y);

            return comparator.compare(xKey, yKey) * sortOrder;
        }));
    }


    public reverse(): List<T> {
        return new List<T>(this.clone().toArray().reverse());
    }


    public equals(
        otherList: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        Assert.argument('otherList', otherList).notNull();
        Assert.argument('comparator', comparator).notNull();

        if (this.length !== otherList.length) {
            return false;
        }

        if (this.length === 0 && otherList.length === 0) {
            return true;
        }

        return this.all((actualItem: T, index: number): boolean => {
            return comparator.equals(actualItem, otherList[index]);
        });
    }


    public skip(offset: number): List<T> {
        Assert.argument('offset', offset).notNull();
        Assert.sequence(this).containsSlice(offset);

        return new List(this.toArray().slice(offset));
    }


    public skipWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        Assert.argument('predicate', predicate).notNull();

        let offset: number = 0;

        this.forEach((actualItem: T, index: number): boolean|void => {
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index, this);

            if (actualItemMatchesPredicate) {
                offset += 1;
            } else {
                return false;
            }
        });

        return this.skip(offset);
    }


    public take(length: number): List<T> {
        Assert.argument('length', length).notNull();
        Assert.sequence(this).containsSlice(0, length);

        return new List(this.toArray().slice(0, length));
    }


    public takeWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        Assert.argument('predicate', predicate).notNull();

        let length: number = 0;

        this.forEach((actualItem: T, index: number): boolean|void => {
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index, this);

            if (actualItemMatchesPredicate) {
                length += 1;
            } else {
                return false;
            }
        });

        return this.take(length);
    }


    public slice(offset: number, length: number): List<T> {
        Assert.argument('offset', offset).notNull();
        Assert.argument('length', length).notNull();
        Assert.sequence(this).containsSlice(offset, length);

        return new List(this.toArray().slice(offset, offset + length));
    }


    public concat(otherList: IEnumerable<T>): List<T> {
        Assert.argument('otherList', otherList).notNull();

        let newList: List<T> = this.clone();

        for (let otherItem of otherList) {
            newList.add(otherItem);
        }

        return newList;
    }


    public union(
        otherList: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): List<T> {
        Assert.argument('otherList', otherList).notNull();
        Assert.argument('comparator', comparator).notNull();

        return List.prototype.aggregate.call(otherList, (union: List<T>, otherItem: T): List<T> => {
            if (!union.contains(otherItem, comparator)) {
                union.add(otherItem);
            }

            return union;
        }, this.clone());
    }


    public zip<TOther, TResult>(
        otherList: IEnumerable<TOther>,
        resultSelector: CombineFunction<T, TOther, TResult>
    ): List<TResult> {
        Assert.argument('otherList', otherList).notNull();
        Assert.argument('resultSelector', resultSelector).notNull();

        let minLength: number = Math.min(this.length, otherList.length);
        let resultsList: List<TResult> = new List<TResult>();

        for (let index = 0; index < minLength; index++) {
            let actualItem: T = this[index];
            let otherItem: TOther = otherList[index];
            let result: TResult = resultSelector(actualItem, otherItem);

            resultsList.add(result);
        }

        return resultsList;
    }


    public toCollection(): Collection<T> {
        return new Collection(this);
    }
}
