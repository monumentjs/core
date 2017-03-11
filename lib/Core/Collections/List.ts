import {IList} from './IList';
import Collection from './Collection';
import {IEqualityComparator} from './IEqualityComparator';
import EqualityComparator from './EqualityComparator';
import {IComparator} from './IComparator';
import {SortOrder} from './SortOrder';
import Sequence from './Sequence';
import {IQueryable} from './IQueryable';
import {IEnumerable} from './IEnumerable';
import {IteratorFunction, CombineFunction} from './types';
import Grouping from './Grouping';
import {IEquatable} from '../types';


export default class List<T> extends Collection<T> implements IList<T>, IQueryable<T>, IEquatable<IList<T>> {
    public static range(start: number, end: number, step: number = 1): List<number> {
        let numbersList: List<number>;

        if (start > end) {
            throw new Error(`Invalid range [${start}, ${end}).`);
        }

        numbersList = new List<number>();

        for (let num = start; num < end; num += step) {
            numbersList.add(num);
        }

        return numbersList;
    }


    public static repeat<T>(value: T, times: number): List<T> {
        let list: List<T>;

        if (times < 0) {
            throw new Error(`Invalid sequence length.`);
        }

        list = new List<T>();

        for (let index = 0; index < times; index++) {
            list.add(value);
        }

        return list;
    }
    
    
    public static generate<T>(generator: (index: number) => T, length: number): List<T> {
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
        Array.prototype.splice.call(this, index, 0, item);
    }


    public insertRange(items: IEnumerable<T>, index: number): void {
        Array.prototype.splice.call(this, index, 0, ...items);
    }


    public removeAt(index: number): void {
        this.throwIfReadOnly();
        Sequence.throwIfIndexOutOfBounds(this, index);
        Array.prototype.splice.call(this, index, 1);
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): void {
        this.throwIfReadOnly();

        let indexOffset: number = 0;
        
        this.forEach((item: T, index: number, list: IEnumerable<T>): void => {
            let itemMatchesPredicate: boolean = predicate(item, index, list);

            if (itemMatchesPredicate) {
                let normalizedIndex = index - indexOffset;
                
                this.removeAt(normalizedIndex);
                
                indexOffset += 1;
            }
        });
    }

    
    public removeAll(
        other: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): void {
        this.throwIfReadOnly();
        this.removeBy((currentItem: T): boolean => {
            for (let otherItem of other) {
                if (comparator.equals(currentItem, otherItem)) {
                    return true;
                }
            }

            return false;
        });
    }
    

    public indexOf(item: T): number {
        return Array.prototype.indexOf.call(this, item);
    }
    
    
    // IQueryable<T> interface implementation


    public forEach(iterator: IteratorFunction<T, boolean|void>): void {
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
        let lastSeed: TAggregate = initialSeed;

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
        }, new List<TResult>());
    }


    public selectMany<TInnerItem, TResult>(
        collectionSelector: IteratorFunction<T, IEnumerable<TInnerItem>>,
        resultSelector: CombineFunction<T, TInnerItem, TResult>,
    ): List<TResult> {
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
        let allValid: boolean = true;

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
        let length: number = this.length;
        let sum: number;

        if (length === 0) {
            return 0;
        }

        sum = this.aggregate((total: number, actualItem: T, index: number, list: List<T>): number => {
            let selectedValue: number = selector(actualItem, index, list);

            return total + selectedValue;
        }, 0);

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
    
    
    public first(predicate: IteratorFunction<T, boolean>, defaultValue?: T): T {
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
    

    public distinct(comparator: IEqualityComparator<T> = EqualityComparator.instance): List<T> {
        let lastFilteredList: List<T> = this;
        let containsDuplicates: boolean = false;

        do {
            containsDuplicates = false;

            lastFilteredList = lastFilteredList.aggregate((
                uniqueValuesList: List<T>,
                actualValue: T,
                index: number,
                list: List<T>
            ): List<T> => {
                if (index === 0) {
                    uniqueValuesList.add(actualValue);
                } else {
                    let previousItem: T = list[index - 1];

                    if (!comparator.equals(previousItem, actualValue)) {
                        uniqueValuesList.add(actualValue);
                    } else {
                        containsDuplicates = true;
                    }
                }

                return uniqueValuesList;
            }, new List<T>());
        } while (containsDuplicates);

        return lastFilteredList;
    }


    public groupBy<TKey>(
        keySelector: IteratorFunction<T, TKey>,
        keyComparer: IEqualityComparator<TKey> = EqualityComparator.instance
    ): List<Grouping<TKey, T>> {
        let groups: List<Grouping<TKey, T>> = new List<Grouping<TKey, T>>();

        this.forEach((actualItem: T, index: number, list: List<T>) => {
            let actualItemKey: TKey = keySelector(actualItem, index, list);
            let correspondingGroup: Grouping<TKey, T> = groups.first((group: Grouping<TKey, T>): boolean => {
                return keyComparer.equals(actualItemKey, group.key);
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

        for (let otherItem of otherList) {
            if (this.contains(otherItem, comparator)) {
                intersection.add(otherItem);
            }
        }

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
        if (this.length === 0) {
            throw new Error('Unable to perform operation on empty list.');
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
        if (this.length === 0) {
            throw new Error('Unable to perform operation on empty list.');
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
        if (this.length !== otherList.length) {
            return false;
        }

        return this.all((actualItem: T, index: number): boolean => {
            return comparator.equals(actualItem, otherList[index]);
        });
    }
    

    public skip(offset: number): List<T> {
        Sequence.assertBounds(this, offset);

        return new List(this.toArray().slice(offset));
    }
    
    
    public skipWhile(predicate: IteratorFunction<T, boolean>): List<T> {
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
        Sequence.assertBounds(this, 0, length);

        return new List(this.toArray().slice(0, length));
    }


    public takeWhile(predicate: IteratorFunction<T, boolean>): List<T> {
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
        Sequence.assertBounds(this, offset, length);

        return new List(this.toArray().slice(offset, length));
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
            let actualItem: T = this[index];
            let otherItem: TOther = otherList[index];
            let result: TResult = resultSelector(actualItem, otherItem);
            
            resultsList.add(result);
        }

        return resultsList;
    }
}
