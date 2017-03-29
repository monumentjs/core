import {IComparator} from './IComparator';
import {IEquatable} from '../types';
import {IEqualityComparator} from './IEqualityComparator';
import {IEnumerable} from './IEnumerable';
import {IList} from './IList';
import {IQueryable} from './IQueryable';
import {SortOrder} from './SortOrder';
import {CombineFunction, IteratorFunction} from './types';
import Collection from './Collection';
import EqualityComparator from './EqualityComparator';
import Sequence from './Sequence';
import Grouping from './Grouping';
import IndexOutOfBoundsException from '../Exceptions/IndexOutOfBoundsException';
import InvalidArgumentException from '../Exceptions/InvalidArgumentException';
import InvalidOperationException from '../Exceptions/InvalidOperationException';
import {assertArgumentNotNull, assertLength, assertRangeBounds} from '../../Assertion/Assert';


export default class List<T> extends Collection<T> implements IList<T>, IQueryable<T>, IEquatable<IList<T>> {
    public static range(start: number, end: number, step: number = 1): List<number> {
        assertArgumentNotNull('start', start);
        assertArgumentNotNull('end', end);
        assertArgumentNotNull('step', step);
        assertRangeBounds(start, end);

        let numbersList: List<number> = new List<number>();

        for (let num = start; num < end; num += step) {
            numbersList.add(num);
        }

        return numbersList;
    }


    public static repeat<T>(value: T, times: number): List<T> {
        assertArgumentNotNull('times', times);
        assertLength(times);

        let list: List<T> = new List<T>();

        for (let index = 0; index < times; index++) {
            list.add(value);
        }

        return list;
    }
    
    
    public static generate<T>(generator: (index: number) => T, length: number): List<T> {
        assertArgumentNotNull('generator', generator);
        assertArgumentNotNull('length', length);
        assertLength(length);

        let list: List<T> = new List<T>();
        
        for (let i = 0; i < length; i++) {
            list.add(generator(i));
        }
        
        return list;
    }


    public clone(): List<T> {
        return new List<T>(this);
    }
    
    
    // IList<T> interface implementation


    public insert(item: T, index: number): void {
        assertArgumentNotNull('index', index);

        this.throwIfReadOnly();

        if (index < 0) {
            throw new IndexOutOfBoundsException(`'index' argument is less than zero.`);
        }

        if (index > this.length) {
            throw new IndexOutOfBoundsException(`'index' argument is greater than list length.`);
        }

        Array.prototype.splice.call(this, index, 0, item);
    }


    public insertRange(items: IEnumerable<T>, index: number): void {
        assertArgumentNotNull('items', items);
        assertArgumentNotNull('index', index);

        this.throwIfReadOnly();

        if (index < 0) {
            throw new IndexOutOfBoundsException(`'index' argument is less than zero.`);
        }

        if (index > this.length) {
            throw new IndexOutOfBoundsException(`'index' argument is greater than list length.`);
        }

        Array.prototype.splice.call(this, index, 0, ...items);
    }


    public removeAt(index: number): void {
        assertArgumentNotNull('index', index);

        this.throwIfReadOnly();

        Sequence.assertIndexBounds(this, index);
        Array.prototype.splice.call(this, index, 1);
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): void {
        assertArgumentNotNull('predicate', predicate);

        this.throwIfReadOnly();

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
        assertArgumentNotNull('other', other);
        assertArgumentNotNull('comparator', comparator);

        this.throwIfReadOnly();

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
        assertArgumentNotNull('startIndex', startIndex);
        assertArgumentNotNull('count', count);
        assertArgumentNotNull('comparator', comparator);

        if (startIndex < 0) {
            throw new IndexOutOfBoundsException(`Start index is less than zero.`);
        }

        if (startIndex > this.length) {
            throw new IndexOutOfBoundsException(`Start index is greater than list length.`);
        }

        if (count < 0) {
            throw new InvalidArgumentException(`Search range is invalid.`);
        }

        if (count > this.length - startIndex) {
            throw new InvalidArgumentException(`Search range is out of bounds.`);
        }

        for (let index: number = startIndex; index < startIndex + count; index++) {
            let currentItem: T = this[index];

            if (comparator.equals(searchItem, currentItem)) {
                return index;
            }
        }

        return -1;
    }
    
    
    // IQueryable<T> interface implementation


    public forEach(iterator: IteratorFunction<T, boolean | void>): void {
        assertArgumentNotNull('iterator', iterator);

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
        iterator: (lastSeed: TAggregate, item: T, index: number, list: IEnumerable<T>) => TAggregate,
        initialSeed?: TAggregate
    ): TAggregate {
        assertArgumentNotNull('iterator', iterator);

        let lastSeed: TAggregate = initialSeed;

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            lastSeed = iterator(lastSeed, actualItem, index, list);
        });

        return lastSeed;
    }


    public select<TResult>(selector: IteratorFunction<T, TResult>): List<TResult> {
        assertArgumentNotNull('selector', selector);

        return this.aggregate<List<TResult>>((
            mappedList: List<TResult>,
            actualItem: T,
            index: number,
            list: IEnumerable<T>
        ): List<TResult> => {
            mappedList.add(selector(actualItem, index, list));

            return mappedList;
        }, new List<TResult>());
    }


    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, IEnumerable<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>,
    ): List<TResult> {
        assertArgumentNotNull('collectionSelector', collectionSelector);
        assertArgumentNotNull('resultSelector', resultSelector);

        let resultList: List<TResult> = new List<TResult>();
        let collections: IEnumerable<IEnumerable<TInnerItem>> = this.select<IEnumerable<TInnerItem>>((
            actualItem: T,
            index: number,
            list: IEnumerable<T>
        ): IEnumerable<TInnerItem> => {
            return collectionSelector(actualItem, index, list);
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
        assertArgumentNotNull('predicate', predicate);

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
        }, new List<T>());
    }


    public all(predicate: IteratorFunction<T, boolean>): boolean {
        assertArgumentNotNull('predicate', predicate);

        if (this.length === 0) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let allValid = true;

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            let actualItemValid: boolean = predicate(actualItem, index, list);

            if (!actualItemValid) {
                allValid = false;
                return false;
            }
        });

        return allValid;
    }


    public any(predicate: IteratorFunction<T, boolean>): boolean {
        assertArgumentNotNull('predicate', predicate);

        if (this.length === 0) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let atLeastOneValid: boolean = false;

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            let actualItemValid: boolean = predicate(actualItem, index, list);

            if (actualItemValid) {
                atLeastOneValid = true;
                return false;
            }
        });

        return atLeastOneValid;
    }


    public average(selector: IteratorFunction<T, number>): number {
        assertArgumentNotNull('selector', selector);

        if (this.length === 0) {
            throw new InvalidOperationException(`Operation is not allowed for empty lists.`);
        }

        let length: number = this.length;
        let sum: number;

        sum = this.aggregate((total: number, actualItem: T, index: number, list: List<T>): number => {
            let selectedValue: number = selector(actualItem, index, list);

            return total + selectedValue;
        }, 0);

        return sum / length;
    }


    public count(predicate: IteratorFunction<T, boolean>): number {
        assertArgumentNotNull('predicate', predicate);

        let count: number = 0;

        this.forEach((item: T, index: number, list: List<T>): void => {
            let itemMatchesPredicate: boolean = predicate(item, index, list);

            if (itemMatchesPredicate) {
                count += 1;
            }
        });

        return count;
    }
    
    
    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T {
        assertArgumentNotNull('predicate', predicate);

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


    public last(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T {
        assertArgumentNotNull('predicate', predicate);

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
     * Returns distinct elements from a sequence by using a specified IEqualityComparator<T> to compare values.
     * @param comparator
     */
    public distinct(comparator: IEqualityComparator<T> = EqualityComparator.instance): List<T> {
        assertArgumentNotNull('comparator', comparator);

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
        assertArgumentNotNull('keySelector', keySelector);
        assertArgumentNotNull('keyComparator', keyComparator);

        let groups: List<Grouping<TKey, T>> = new List<Grouping<TKey, T>>();

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            let actualItemKey: TKey = keySelector(actualItem, index, list);
            let correspondingGroup: Grouping<TKey, T> = groups.first((group: Grouping<TKey, T>): boolean => {
                return keyComparator.equals(actualItemKey, group.key);
            });

            if (!correspondingGroup) {
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
        assertArgumentNotNull('otherList', otherList);
        assertArgumentNotNull('comparator', comparator);

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
        assertArgumentNotNull('otherList', otherList);
        assertArgumentNotNull('comparator', comparator);

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
        assertArgumentNotNull('outerList', outerList);
        assertArgumentNotNull('outerKeySelector', outerKeySelector);
        assertArgumentNotNull('innerKeySelector', innerKeySelector);
        assertArgumentNotNull('resultSelector', resultSelector);
        assertArgumentNotNull('keyComparator', keyComparator);

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
        assertArgumentNotNull('selector', selector);

        if (this.length === 0) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((minValue: number, actualItem: T, index: number): number => {
            let itemValue: number = selector(actualItem, index, this);

            if (index === 0) {
                return itemValue;
            }

            return Math.min(minValue, itemValue);
        });
    }


    public max(selector: IteratorFunction<T, number>): number {
        assertArgumentNotNull('selector', selector);

        if (this.length === 0) {
            throw new InvalidOperationException('Unable to perform operation on empty list.');
        }

        return this.aggregate((maxValue: number, actualItem: T, index: number): number => {
            let itemValue: number = selector(actualItem, index, this);

            if (index === 0) {
                return itemValue;
            }

            return Math.max(maxValue, itemValue);
        });
    }


    public orderBy<TKey>(
        keySelector: (item: T) => TKey,
        comparator: IComparator<TKey>,
        sortOrder: SortOrder = SortOrder.Ascending
    ): List<T> {
        assertArgumentNotNull('keySelector', keySelector);
        assertArgumentNotNull('comparator', comparator);
        assertArgumentNotNull('sortOrder', sortOrder);

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
        assertArgumentNotNull('otherList', otherList);
        assertArgumentNotNull('comparator', comparator);

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
        assertArgumentNotNull('offset', offset);

        Sequence.assertSliceBounds(this, offset);

        return new List(this.toArray().slice(offset));
    }
    
    
    public skipWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        assertArgumentNotNull('predicate', predicate);

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
        assertArgumentNotNull('length', length);

        Sequence.assertSliceBounds(this, 0, length);

        return new List(this.toArray().slice(0, length));
    }


    public takeWhile(predicate: IteratorFunction<T, boolean>): List<T> {
        assertArgumentNotNull('predicate', predicate);

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
        assertArgumentNotNull('offset', offset);
        assertArgumentNotNull('length', length);

        Sequence.assertSliceBounds(this, offset, length);

        return new List(this.toArray().slice(offset, offset + length));
    }


    public concat(otherList: IEnumerable<T>): List<T> {
        assertArgumentNotNull('otherList', otherList);

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
        assertArgumentNotNull('otherList', otherList);
        assertArgumentNotNull('comparator', comparator);

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
        assertArgumentNotNull('otherList', otherList);
        assertArgumentNotNull('resultSelector', resultSelector);

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
}
