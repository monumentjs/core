import {Assert} from '../assert/Assert';
import {ArgumentIndexOutOfBoundsException} from '../exceptions/ArgumentIndexOutOfBoundsException';
import {Cloneable} from '../Cloneable';
import {Equatable} from '../Equatable';
import {EqualityComparator} from '../EqualityComparator';
import {ArgumentRangeException} from '../exceptions/ArgumentRangeException';
import {List} from './List';
import {IteratorFunction} from './IteratorFunction';
import {AbstractList} from './AbstractList';
import {LinkedListNode} from './LinkedListNode';
import {NEGATIVE_ONE, ZERO} from '../Constants';
import {Sequence} from './Sequence';

type LinkedListIteratorFunction<TItem, TResult> = (node: LinkedListNode<TItem>, index: number) => TResult;


export class LinkedList<T> extends AbstractList<T> implements Cloneable<LinkedList<T>>, Equatable<List<T>> {
    private _length: number = ZERO;
    private _firstNode: LinkedListNode<T> | undefined;
    private _lastNode: LinkedListNode<T> | undefined;

    public get length(): number {
        return this._length;
    }

    public constructor(items?: Sequence<T>) {
        super();

        if (items != null) {
            this.addAll(items);
        }
    }

    // Enumerable interface implementation

    public [Symbol.iterator](): Iterator<T> {
        let node: LinkedListNode<T> | undefined = this._firstNode;

        return {
            next: () => {
                let result;

                if (node) {
                    result = {
                        value: node.nodeValue,
                        done: false
                    };

                    node = node.nextNode;
                } else {
                    result = {
                        value: undefined as any,
                        done: true
                    };
                }

                return result;
            }
        };
    }

    public add(item: T): boolean {
        const newNode: LinkedListNode<T> = new LinkedListNode(item);

        newNode.link(this._lastNode, undefined);

        this._lastNode = newNode;

        if (this._firstNode == null) {
            this._firstNode = newNode;
        }

        this._length++;

        return true;
    }

    public clear(): boolean {
        if (this.isEmpty) {
            return false;
        }

        delete this._firstNode;
        delete this._lastNode;

        this._length = ZERO;

        return true;
    }

    // Cloneable interface implementation

    public clone(): LinkedList<T> {
        return new LinkedList(this);
    }

    // Equatable interface implementation

    public equals(otherList: Sequence<T>): boolean;
    public equals(otherList: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public equals(otherList: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        if (this.length !== otherList.length) {
            return false;
        }

        if (this.isEmpty) {
            return true;
        }

        let node: LinkedListNode<T> | undefined = this._firstNode;

        for (const otherItem of otherList) {
            if (node) {
                if (!this.checkEquality(otherItem, node.nodeValue, comparator)) {
                    return false;
                }

                node = node.nextNode;
            } else {
                return false;
            }
        }

        return true;
    }

    // Collection interface implementation

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

        for (let index = startIndex, node = this.getNodeAt(startIndex); count > ZERO && node != null; count--, index++, node = node.nextNode) {
            const stop: boolean = iterator(node.nodeValue, index) === false;

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

        for (let index = startIndex, node = this.getNodeAt(startIndex); count > ZERO && node != null; count--, index--, node = node.previousNode) {
            const stop: boolean = iterator(node.nodeValue, index) === false;

            if (stop) {
                break;
            }
        }
    }

    public getAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this);

        const node: LinkedListNode<T> = this.getNodeAt(index) as LinkedListNode<T>;

        return node.nodeValue;
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

        for (let index = _startIndex, node = this.getNodeAt(_startIndex); _count > ZERO && node != null; index++, _count--, node = node.nextNode) {
            const currentItem: T = node.nodeValue;

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

        const previousNode: LinkedListNode<T> | undefined = this.getNodeAt(index - 1);
        const nextNode: LinkedListNode<T> | undefined = this.getNodeAt(index);
        const newNode: LinkedListNode<T> = new LinkedListNode(item);

        newNode.link(previousNode, nextNode);

        if (previousNode == null) {
            this._firstNode = newNode;
        }

        if (nextNode == null) {
            this._lastNode = newNode;
        }

        this._length++;

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

        for (const item of items) {
            this.insert(index, item);

            index++;
        }

        return true;
    }

    // List interface implementation

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
            for (let index = this.lastIndex, node = this._lastNode; index >= ZERO && node != null; index--, node = node.previousNode) {
                const currentItem: T = node.nodeValue;

                if (this.checkEquality(searchItem, currentItem, _comparator)) {
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

            for (let index = _startIndex, node = this.getNodeAt(_startIndex); index >= ZERO && node != null; index--, node = node.previousNode) {
                const currentItem: T = node.nodeValue;

                if (this.checkEquality(searchItem, currentItem, _comparator)) {
                    return index;
                }
            }
        }

        // Start index is omitted, count is defined

        if (_startIndex == null && _count != null) {
            if (_count < ZERO || _count > this.length) {
                throw new ArgumentRangeException('count', _count, ZERO, this.length);
            }

            for (let index = this.lastIndex, node = this._lastNode; _count > ZERO && node != null; index--, _count--, node = node.previousNode) {
                const currentItem: T = node.nodeValue;

                if (this.checkEquality(searchItem, currentItem, _comparator)) {
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

            for (let index = _startIndex, node = this.getNodeAt(_startIndex); _count > ZERO && node != null; index--, _count--, node = node.previousNode) {
                const currentItem: T = node.nodeValue;

                if (this.checkEquality(searchItem, currentItem, _comparator)) {
                    return index;
                }
            }
        }

        return NEGATIVE_ONE;
    }

    public remove(item: T): boolean;
    public remove(item: T, comparator: EqualityComparator<T>): boolean;
    public remove(item: T, comparator?: EqualityComparator<T>): boolean {
        const node: LinkedListNode<T> | undefined = this.findNode(item, comparator);

        if (node == null) {
            return false;
        }

        this.removeNode(node);

        return true;
    }

    public removeAll(items: Sequence<T>): boolean;
    public removeAll(items: Sequence<T>, comparator: EqualityComparator<T>): boolean;
    public removeAll(items: Sequence<T>, comparator?: EqualityComparator<T>): boolean {
        const oldLength: number = this.length;

        for (const otherItem of items) {
            this.forEachNode((node: LinkedListNode<T>) => {
                const currentItem: T = node.nodeValue;

                if (this.checkEquality(currentItem, otherItem, comparator)) {
                    this.removeNode(node);
                }
            });
        }

        return this.length !== oldLength;
    }

    public removeAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this);

        const node: LinkedListNode<T> = this.getNodeAt(index) as LinkedListNode<T>;

        this.removeNode(node);

        return node.nodeValue;
    }

    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        const oldLength: number = this.length;

        let currentNode: LinkedListNode<T> | undefined = this._firstNode;
        let index: number = ZERO;

        while (currentNode) {
            const nextNode: LinkedListNode<T> | undefined = currentNode.nextNode;
            const remove: boolean = predicate(currentNode.nodeValue, index);

            if (remove) {
                this.removeNode(currentNode);
            }

            index++;

            currentNode = nextNode;
        }

        return this.length !== oldLength;
    }

    public setAt(index: number, newValue: T): T {
        Assert.argument('index', index).isIndexOf(this);

        const node: LinkedListNode<T> = this.getNodeAt(index) as LinkedListNode<T>;
        const oldValue: T = node.nodeValue;

        node.nodeValue = newValue;

        return oldValue;
    }

    protected createList<TItem>(items?: Sequence<TItem>): List<TItem> {
        return new LinkedList(items);
    }

    private findNode(value: T, comparator?: EqualityComparator<T>): LinkedListNode<T> | undefined {
        let result: LinkedListNode<T> | undefined;

        this.forEachNode((node: LinkedListNode<T>): boolean | void => {
            if (this.checkEquality(node.nodeValue, value, comparator)) {
                result = node;

                return false;
            }
        });

        return result;
    }

    private forEachNode(iterator: LinkedListIteratorFunction<T, boolean | void>): void {
        let node: LinkedListNode<T> | undefined = this._firstNode;
        let index: number = ZERO;

        while (node) {
            const nextNode: LinkedListNode<T> | undefined = node.nextNode;
            const returnValue: boolean | void = iterator(node, index);

            if (returnValue === false) {
                break;
            }

            index++;
            node = nextNode;
        }
    }

    private forEachNodeReversed(iterator: LinkedListIteratorFunction<T, boolean | void>): void {
        let node: LinkedListNode<T> | undefined = this._lastNode;
        let index: number = this.lastIndex;

        while (node != null) {
            const nextNode = node.previousNode;
            const returnValue: boolean | void = iterator(node, index);

            if (returnValue === false) {
                break;
            }

            index--;
            node = nextNode;
        }
    }

    private getNodeAt(searchIndex: number): LinkedListNode<T> | undefined {
        if (searchIndex < ZERO || searchIndex >= this.length) {
            return;
        }

        // Optimization for first and last nodes.

        if (searchIndex === ZERO) {
            return this._firstNode;
        }

        if (searchIndex === this.lastIndex) {
            return this._lastNode;
        }

        let foundNode: LinkedListNode<T> | undefined;
        const midIndex: number = Math.ceil(this.length / 2);

        // Optimize iteration by starting from run or end.

        if (searchIndex < midIndex) {
            this.forEachNode((node: LinkedListNode<T>, nodeIndex: number): boolean | void => {
                if (searchIndex === nodeIndex) {
                    foundNode = node;

                    return false;
                }
            });
        } else {
            this.forEachNodeReversed((node: LinkedListNode<T>, nodeIndex: number): boolean | void => {
                if (searchIndex === nodeIndex) {
                    foundNode = node;

                    return false;
                }
            });
        }

        return foundNode;
    }

    private removeNode(node: LinkedListNode<T>): void {
        if (this._firstNode === node) {
            this._firstNode = node.nextNode;
        }

        if (this._lastNode === node) {
            this._lastNode = node.previousNode;
        }

        node.unlink();

        this._length--;
    }
}
