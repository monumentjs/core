import {Equatable} from '@monument/core/main/Equatable';
import {ArgumentIndexOutOfBoundsException} from '@monument/core/main/exceptions/ArgumentIndexOutOfBoundsException';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {Cloneable} from '@monument/core/main/Cloneable';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {ArgumentRangeException} from '@monument/core/main/exceptions/ArgumentRangeException';
import {List} from '@monument/collections-core/main/List';
import {IteratorFunction} from '@monument/collections-core/main/IteratorFunction';
import {Collection} from '@monument/collections-core/main/Collection';
import {Assert} from '@monument/assert/main/Assert';
import {AbstractList} from './AbstractList';


export class ArrayList<T> extends AbstractList<T> implements Cloneable<ArrayList<T>>, Equatable<List<T>> {
    private readonly _items: T[] = [];


    public get length(): number {
        return this._items.length;
    }


    public constructor(items?: Iterable<T>) {
        super();

        if (items != null) {
            this.addAll(items);
        }
    }


    public getIterator(): Iterator<T> {
        return this._items[Symbol.iterator]();
    }


    public forEach(
        iterator: IteratorFunction<T, boolean | void>,
        startIndex: number = 0,
        count: number = this.length - startIndex
    ): void {
        this.validateSliceBounds(startIndex, count);

        if (count === 0) {
            return;
        }

        let result: boolean | void;

        for (let index = startIndex; count > 0 && result !== false; index++, count--) {
            result = iterator(this._items[index], index);
        }
    }


    public forEachReversed(
        iterator: IteratorFunction<T, boolean | void>,
        startIndex: number = this.length - 1,
        count: number = startIndex + 1
    ): void {
        this.validateSliceBounds(startIndex - count, count);

        if (count === 0) {
            return;
        }

        let token: boolean | void;

        for (let index = this.length - 1; count > 0 && token !== false; index--, count--) {
            token = iterator(this._items[index], index);
        }
    }


    public getAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this._items);

        return this._items[index];
    }


    public setAt(index: number, newValue: T): T {
        Assert.argument('index', index).isIndexOf(this._items);

        let oldValue: T = this._items[index];

        this._items[index] = newValue;

        return oldValue;
    }


    public equals(
        otherList: Collection<T>,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): boolean {
        if (this.length !== otherList.length) {
            return false;
        }

        if (this.isEmpty && otherList.length === 0) {
            return true;
        }

        let index: number = 0;

        for (let otherItem of otherList) {
            if (!comparator.equals(otherItem, this.getAt(index))) {
                return false;
            }

            index++;
        }

        return true;
    }


    public clone(): ArrayList<T> {
        return new ArrayList(this);
    }


    // Collection interface implementation

    public add(item: T): boolean {
        this._items.push(item);

        return true;
    }


    public remove(
        otherItem: T,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): boolean {
        let index: number = 0;

        for (let currentItem of this) {
            if (comparator.equals(otherItem, currentItem)) {
                this._items.splice(index, 1);

                return true;
            }

            index++;
        }

        return false;
    }


    public removeAll(
        otherItems: Iterable<T>,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): boolean {
        const oldLength: number = 0;

        for (let otherItem of otherItems) {
            let index: number = 0;

            for (let currentItem of this) {
                if (comparator.equals(currentItem, otherItem)) {
                    this.removeAt(index);
                }

                index++;
            }
        }

        return this.length !== oldLength;
    }


    public removeAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this);

        return this._items.splice(index, 1)[0];
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        const oldLength: number = this.length;

        for (let index = 0, actualIndex = 0; index < oldLength; index++, actualIndex++) {
            const itemMatchesPredicate: boolean = predicate(this.getAt(actualIndex), index);

            if (itemMatchesPredicate) {
                this._items.splice(actualIndex, 1);

                actualIndex--;
            }
        }

        return this.length !== oldLength;
    }


    public clear(): boolean {
        if (this.length > 0) {
            this._items.length = 0;

            return true;
        }

        return false;
    }


    // List implementation

    public insert(index: number, item: T): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.length);
        }

        this._items.splice(index, 0, item);

        return true;
    }


    public insertAll(index: number, items: Iterable<T>): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.length);
        }

        const oldLength: number = this.length;

        this._items.splice(index, 0, ...items);

        return this.length !== oldLength;
    }


    public indexOf(
        searchItem: T,
        startIndex: number = 0,
        count: number = this.length - startIndex,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): number {
        this.validateSliceBounds(startIndex, count);

        for (let index: number = startIndex; index < startIndex + count; index++) {
            let currentItem: T = this.getAt(index);

            if (comparator.equals(searchItem, currentItem)) {
                return index;
            }
        }

        return -1;
    }


    public lastIndexOf(
        searchItem: T,
        startIndex?: number,
        count?: number,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): number {

        // Start index and count are omitted

        if (startIndex == null && count == null) {
            for (let index = this.length - 1; index >= 0; index--) {
                let currentItem = this.getAt(index);

                if (comparator.equals(searchItem, currentItem)) {
                    return index;
                }
            }
        }

        // Start index is defined, count is omitted

        if (startIndex != null && count == null) {
            if (startIndex !== 0) {
                Assert.argument('startIndex', startIndex).isIndexOf(this);
            }

            if (this.isEmpty) {
                return -1;
            }

            for (let index = startIndex; index >= 0; index--) {
                let currentItem = this.getAt(index);

                if (comparator.equals(searchItem, currentItem)) {
                    return index;
                }
            }
        }

        // Start index is omitted, count is defined

        if (startIndex == null && count != null) {
            if (count < 0 || count > this.length) {
                throw new ArgumentRangeException('count', count, 0, this.length);
            }

            let itemsLeft: number = count;

            for (let index = this.length - 1; itemsLeft > 0; index--, itemsLeft--) {
                let currentItem = this.getAt(index);

                if (comparator.equals(searchItem, currentItem)) {
                    return index;
                }
            }
        }

        // Start index and count are defined

        if (startIndex != null && count != null) {
            if (startIndex !== 0) {
                Assert.argument('startIndex', startIndex).isIndexOf(this);
            }

            if (this.isEmpty) {
                return -1;
            }

            if (count < 0 || count > this.length) {
                throw new ArgumentRangeException('count', count, 0, this.length);
            }

            let itemsLeft: number = count;

            for (let index = startIndex; itemsLeft > 0; index--, itemsLeft--) {
                let currentItem = this.getAt(index);

                if (comparator.equals(searchItem, currentItem)) {
                    return index;
                }
            }
        }

        return -1;
    }


    protected createList<TItem>(items?: Iterable<TItem>): List<TItem> {
        return new ArrayList(items);
    }
}
