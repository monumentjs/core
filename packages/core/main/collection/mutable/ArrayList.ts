import {Assert} from '../../assert/Assert';
import {ArgumentIndexOutOfBoundsException} from '../../exceptions/ArgumentIndexOutOfBoundsException';
import {ArgumentRangeException} from '../../exceptions/ArgumentRangeException';
import {Cloneable} from '../../Cloneable';
import {Equatable} from '../../utils/comparison/Equatable';
import {EqualityComparator} from '../../utils/comparison/EqualityComparator';
import {List} from './List';
import {IteratorFunction} from '../IteratorFunction';
import {AbstractList} from './AbstractList';
import {NEGATIVE_ONE, ZERO} from '../../Constants';
import {Sequence} from '../readonly/Sequence';


export class ArrayList<T> extends AbstractList<T> implements Cloneable<ArrayList<T>>, Equatable<Sequence<T>> {
    private readonly _items: T[];

    public get length(): number {
        return this._items.length;
    }

    public constructor(items?: Sequence<T>) {
        super();

        this._items = items != null ? [...items] : [];
    }

    public [Symbol.iterator](): Iterator<T> {
        return this._items[Symbol.iterator]();
    }

    public add(item: T): boolean {
        this._items.push(item);

        return true;
    }

    public clear(): boolean {
        if (this.isEmpty) {
            return false;
        }

        this._items.length = ZERO;

        return true;
    }

    public clone(): ArrayList<T> {
        return new ArrayList(this);
    }

    public equals(otherList: Sequence<T>): boolean;
    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public equals(
        otherList: Sequence<T>,
        comparator?: EqualityComparator<T>
    ): boolean {
        if (this.length !== otherList.length) {
            return false;
        }

        if (this.isEmpty && otherList.length === ZERO) {
            return true;
        }

        let index: number = ZERO;

        for (const otherItem of otherList) {
            const currentItem: T = this.getAt(index);

            if (!this.checkEquality(currentItem, otherItem, comparator)) {
                return false;
            }

            index++;
        }

        return true;
    }

    public forEach(iterator: IteratorFunction<T, boolean | void>): void;
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public forEach(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;
    public forEach(
        iterator: IteratorFunction<T, boolean | void>,
        startIndex: number = ZERO,
        count: number = this.length - startIndex
    ): void {
        this.validateSliceBounds(startIndex, count);

        if (count === ZERO) {
            return;
        }

        for (let index = startIndex, itemsLeft = count; itemsLeft > ZERO; index++, itemsLeft--) {
            const stop: boolean = iterator(this._items[index], index) === false;

            if (stop) {
                break;
            }
        }
    }

    public forEachReversed(iterator: IteratorFunction<T, boolean | void>): void;
    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number): void;
    public forEachReversed(iterator: IteratorFunction<T, boolean | void>, startIndex: number, count: number): void;
    public forEachReversed(
        iterator: IteratorFunction<T, boolean | void>,
        startIndex: number = this.lastIndex,
        count: number = startIndex + 1
    ): void {
        this.validateSliceBounds(startIndex - count, count);

        if (count === ZERO) {
            return;
        }

        for (let index = this.lastIndex, itemsLeft = count; count > ZERO; index--, itemsLeft--) {
            const stop: boolean = iterator(this._items[index], index) === false;

            if (stop) {
                break;
            }
        }
    }

    // Collection interface implementation

    public getAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this._items);

        return this._items[index];
    }

    public indexOf(item: T): number;
    public indexOf(item: T, comparator: EqualityComparator<T>): number;
    public indexOf(item: T, startIndex: number): number;
    public indexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;
    public indexOf(item: T, startIndex: number, count: number): number;
    public indexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;
    public indexOf(
        searchItem: T,
        startIndex?: number | EqualityComparator<T>,
        count?: number | EqualityComparator<T>,
        comparator?: EqualityComparator<T>
    ): number {
        let _startIndex: number;
        let _count: number;
        let _comparator: EqualityComparator<T> | undefined;

        if (typeof startIndex === 'number') {
            _startIndex = startIndex;
        } else {
            _startIndex = ZERO;
        }

        if (typeof count === 'number') {
            _count = count;
        } else {
            _count = this.length - _startIndex;
        }

        if (typeof startIndex === 'object') {
            _comparator = startIndex;
        }

        if (typeof count === 'object') {
            _comparator = count;
        }

        if (typeof comparator === 'object') {
            _comparator = comparator;
        }

        this.validateSliceBounds(_startIndex, _count);

        for (let index: number = _startIndex; index < _startIndex + _count; index++) {
            const currentItem: T = this.getAt(index);

            if (this.checkEquality(currentItem, searchItem, _comparator)) {
                return index;
            }
        }

        return NEGATIVE_ONE;
    }

    public insert(index: number, item: T): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, ZERO, this.length);
        }

        this._items.splice(index, ZERO, item);

        return true;
    }

    public insertAll(index: number, items: Sequence<T>): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, ZERO, this.length);
        }

        if (items.length === ZERO) {
            return false;
        }

        this._items.splice(index, ZERO, ...items);

        return true;
    }

    public lastIndexOf(item: T): number;
    public lastIndexOf(item: T, comparator: EqualityComparator<T>): number;
    public lastIndexOf(item: T, startIndex: number): number;
    public lastIndexOf(item: T, startIndex: number, comparator: EqualityComparator<T>): number;
    public lastIndexOf(item: T, startIndex: number, count: number): number;
    public lastIndexOf(item: T, startIndex: number, count: number, comparator: EqualityComparator<T>): number;
    public lastIndexOf(
        searchItem: T,
        startIndex?: number | EqualityComparator<T>,
        count?: number | EqualityComparator<T>,
        comparator?: EqualityComparator<T>
    ): number {
        let _startIndex: number | undefined;
        let _count: number | undefined;
        let _comparator: EqualityComparator<T> | undefined;

        if (typeof startIndex === 'number') {
            _startIndex = startIndex;
        }

        if (typeof count === 'number') {
            _count = count;
        }

        if (typeof startIndex === 'object') {
            _comparator = startIndex;
        }

        if (typeof count === 'object') {
            _comparator = count;
        }

        if (typeof comparator === 'object') {
            _comparator = comparator;
        }

        // Start index and count are omitted

        if (_startIndex == null && _count == null) {
            for (let index = this.lastIndex; index >= ZERO; index--) {
                const currentItem = this.getAt(index);

                if (this.checkEquality(currentItem, searchItem, _comparator)) {
                    return index;
                }
            }
        }

        // Start index is defined, count is omitted

        if (_startIndex != null && _count == null) {
            if (_startIndex !== ZERO) {
                Assert.argument('startIndex', _startIndex).isIndexOf(this);
            }

            if (this.isEmpty) {
                return NEGATIVE_ONE;
            }

            for (let index = _startIndex; index >= ZERO; index--) {
                const currentItem = this.getAt(index);

                if (this.checkEquality(currentItem, searchItem, _comparator)) {
                    return index;
                }
            }
        }

        // Start index is omitted, count is defined

        if (_startIndex == null && _count != null) {
            if (_count < ZERO || _count > this.length) {
                throw new ArgumentRangeException('count', _count, ZERO, this.length);
            }

            let itemsLeft: number = _count;

            for (let index = this.lastIndex; itemsLeft > ZERO; index--, itemsLeft--) {
                const currentItem: T = this.getAt(index);

                if (this.checkEquality(currentItem, searchItem, _comparator)) {
                    return index;
                }
            }
        }

        // Start index and count are defined

        if (_startIndex != null && _count != null) {
            if (_startIndex !== ZERO) {
                Assert.argument('startIndex', _startIndex).isIndexOf(this);
            }

            if (this.isEmpty) {
                return NEGATIVE_ONE;
            }

            if (_count < ZERO || _count > this.length) {
                throw new ArgumentRangeException('count', _count, ZERO, this.length);
            }

            let itemsLeft: number = _count;

            for (let index = _startIndex; itemsLeft > ZERO; index--, itemsLeft--) {
                const currentItem = this.getAt(index);

                if (this.checkEquality(currentItem, searchItem, _comparator)) {
                    return index;
                }
            }
        }

        return NEGATIVE_ONE;
    }

    public remove(item: T): boolean;
    public remove(item: T, comparator: EqualityComparator<T>): boolean;
    public remove(
        otherItem: T,
        comparator?: EqualityComparator<T>
    ): boolean {
        let index: number = ZERO;

        for (const currentItem of this) {
            if (this.checkEquality(currentItem, otherItem, comparator)) {
                this._items.splice(index, 1);

                return true;
            }

            index++;
        }

        return false;
    }

    // List implementation

    public removeAll(items: Sequence<T>): boolean;
    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public removeAll(
        otherItems: Sequence<T>,
        comparator?: EqualityComparator<T>
    ): boolean {
        const oldLength: number = ZERO;

        for (const otherItem of otherItems) {
            let index: number = ZERO;

            for (const currentItem of this) {
                if (this.checkEquality(currentItem, otherItem, comparator)) {
                    this.removeAt(index);
                }

                index++;
            }
        }

        return this.length !== oldLength;
    }

    public removeAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this);

        return this._items.splice(index, 1)[ZERO];
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        const oldLength: number = this.length;

        for (let index = ZERO, actualIndex = ZERO; index < oldLength; index++, actualIndex++) {
            const itemMatchesPredicate: boolean = predicate(this.getAt(actualIndex), index);

            if (itemMatchesPredicate) {
                this._items.splice(actualIndex, 1);

                actualIndex--;
            }
        }

        return this.length !== oldLength;
    }

    public setAt(index: number, newValue: T): T {
        Assert.argument('index', index).isIndexOf(this._items);

        const oldValue: T = this._items[index];

        this._items[index] = newValue;

        return oldValue;
    }

    protected createList<TItem>(items?: Sequence<TItem>): List<TItem> {
        return new ArrayList(items);
    }
}
