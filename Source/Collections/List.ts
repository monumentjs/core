import {IEnumerable} from './Abstraction/IEnumerable';
import {IList} from './Abstraction/IList';
import {IQueryable} from './Abstraction/IQueryable';
import {SortOrder} from './SortOrder';
import {IteratorFunction} from './IteratorFunction';
import {Collection} from './Collection';
import {EqualityComparator} from '../Core/EqualityComparator';
import {Grouping} from './Grouping';
import {InvalidOperationException} from '../Exceptions/InvalidOperationException';
import {Assert} from '../Assertion/Assert';
import {ArgumentIndexOutOfBoundsException} from '../Exceptions/ArgumentIndexOutOfBoundsException';
import {RangeException} from '../Exceptions/RangeException';
import {IEquatable} from '../Core/Abstraction/IEquatable';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';
import {IComparator} from '../Core/Abstraction/IComparator';
import {CombineFunction} from './CombineFunction';


export class List<T> extends Collection<T> implements IList<T>, IQueryable<T>, IEquatable<IList<T>> {
    public clone(): List<T> {
        return new List(this);
    }


    // IList implementation


    public insert(index: number, item: T): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.length);
        }

        Array.prototype.splice.call(this, index, 0, item);

        return true;
    }


    public insertAll(index: number, items: IEnumerable<T>): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.length);
        }

        const oldLength: number = this.length;

        Array.prototype.splice.call(this, index, 0, ...items);

        return this.length !== oldLength;
    }


    public slice(offset: number, length: number): List<T> {
        Assert.argument('offset', offset).isIndex();
        Assert.argument('length', length).isLength();

        if (length !== 0) {
            Assert.sequence(this).containsSlice(offset, length);
        }

        return new List(Array.prototype.slice.call(this, offset, offset + length));
    }


    public removeAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this);

        return Array.prototype.splice.call(this, index, 1)[0];
    }


    public indexOf(
        searchItem: T,
        startIndex: number = 0,
        count: number = this.length - startIndex,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): number {
        if (startIndex !== 0) {
            Assert.argument('startIndex', startIndex).isIndexOf(this);
        }

        Assert.argument('count', count).isLength();
        Assert.sequence(this).containsSlice(startIndex, count);

        for (let index: number = startIndex; index < startIndex + count; index++) {
            let currentItem: T = this[index] as T;

            if (comparator.equals(searchItem, currentItem)) {
                return index;
            }
        }

        return -1;
    }


    public lastIndexOf(
        searchItem: T,
        startIndex: number = this.isEmpty ? 0 : this.length - 1,
        count?: number,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): number {
        if (count == null) {
            count = startIndex + 1;
        }

        const endIndex: number = startIndex - count + 1;

        if (startIndex < 0) {
            throw new ArgumentIndexOutOfBoundsException('startIndex', startIndex, 0, this.length);
        }

        if (startIndex > this.length) {
            throw new ArgumentIndexOutOfBoundsException('startIndex', startIndex, 0, this.length);
        }

        Assert.argument('count', count).isLength();

        if (endIndex < 0) {
            throw new RangeException(`Search range (${endIndex}...${startIndex}) is not valid.`);
        }

        while (count > 0) {
            let currentItem: T = this[startIndex] as T;

            if (comparator.equals(searchItem, currentItem)) {
                return startIndex;
            }

            startIndex--;
            count--;
        }

        return -1;
    }


    // IQueryable implementation


    public forEach(iterator: IteratorFunction<T, boolean | void>): void {
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
        iterator: (lastSeed: TAggregate | undefined, item: T, index: number, list: IEnumerable<T>) => TAggregate,
        initialSeed?: TAggregate | undefined
    ): TAggregate | undefined {
        let lastSeed: TAggregate | undefined = initialSeed;

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            lastSeed = iterator(lastSeed, actualItem, index, list);
        });

        return lastSeed;
    }


    public select<TResult>(selector: IteratorFunction<T, TResult>): List<TResult> {
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
            let actualItem: T = this[index] as T;

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
        if (this.isEmpty) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let allValid = true;

        this.forEach((actualItem: T, index: number, list: List<T>): void | boolean => {
            let actualItemValid: boolean = predicate(actualItem, index, list);

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

        this.forEach((actualItem: T, index: number, list: List<T>): void | boolean => {
            let actualItemValid: boolean = predicate(actualItem, index, list);

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

        sum = this.aggregate((total: number, actualItem: T, index: number, list: List<T>): number => {
            let selectedValue: number = selector(actualItem, index, list);

            return total + selectedValue;
        }, 0) as number;

        return sum / length;
    }


    public count(predicate: IteratorFunction<T, boolean>): number {
        let count: number = 0;

        this.forEach((item: T, index: number, list: List<T>): void => {
            let itemMatchesPredicate: boolean = predicate(item, index, list);

            if (itemMatchesPredicate) {
                count += 1;
            }
        });

        return count;
    }


    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        for (let index = 0; index < this.length; index++) {
            let actualItem: T = this[index] as T;
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index, this);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }


    public firstOrDefault(defaultValue: T): T {
        if (this.length > 0) {
            return this[0] as T;
        } else {
            return defaultValue;
        }
    }


    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T | undefined {
        for (let index = this.length - 1; index >= 0; index--) {
            let actualItem: T = this[index] as T;
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index, this);

            if (actualItemMatchesPredicate) {
                return actualItem;
            }
        }

        return defaultValue;
    }


    public lastOrDefault(defaultValue: T): T {
        if (this.length > 0) {
            return this[this.length - 1] as T;
        } else {
            return defaultValue;
        }
    }

    /**
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<TItem> to compare values.
     * @param comparator
     */
    public distinct(comparator: IEqualityComparator<T> = EqualityComparator.instance): List<T> {
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
        let groups: List<Grouping<TKey, T>> = new List<Grouping<TKey, T>>();

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            let actualItemKey: TKey = keySelector(actualItem, index, list);
            let correspondingGroup: Grouping<TKey, T> | undefined = groups.first((group: Grouping<TKey, T>): boolean => {
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
        if (this.isEmpty) {
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
        if (this.isEmpty) {
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
        return new List<T>(this.toArray().sort((x: T, y: T): number => {
            let xKey: TKey = keySelector(x);
            let yKey: TKey = keySelector(y);

            return comparator.compare(xKey, yKey) * sortOrder;
        }));
    }


    public reverse(): List<T> {
        return new List<T>(Array.prototype.reverse.call(this));
    }


    public skip(offset: number): List<T> {
        if (offset !== 0) {
            Assert.argument('offset', offset).isIndexOf(this);
        }

        return new List(Array.prototype.slice.call(this, offset));
    }


    public skipWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        let offset: number = 0;

        this.forEach((actualItem: T, index: number): boolean | void => {
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
        Assert.sequence(this).containsSlice(0, length);

        return new List(this.toArray().slice(0, length));
    }


    public takeWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        let length: number = 0;

        this.forEach((actualItem: T, index: number): boolean | void => {
            let actualItemMatchesPredicate: boolean = predicate(actualItem, index, this);

            if (actualItemMatchesPredicate) {
                length += 1;
            } else {
                return false;
            }
        });

        return this.take(length);
    }


    public concat(otherList: IEnumerable<T>): List<T> {
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
        let minLength: number = Math.min(this.length, otherList.length);
        let resultsList: List<TResult> = new List<TResult>();

        for (let index = 0; index < minLength; index++) {
            let actualItem: T = this[index] as T;
            let otherItem: TOther = otherList[index] as TOther;
            let result: TResult = resultSelector(actualItem, otherItem);

            resultsList.add(result);
        }

        return resultsList;
    }
}
