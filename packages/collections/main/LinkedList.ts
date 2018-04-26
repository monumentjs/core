import {Assert} from '@monument/assert/main/Assert';
import {ArgumentIndexOutOfBoundsException} from '@monument/core/main/exceptions/ArgumentIndexOutOfBoundsException';
import {Cloneable} from '@monument/core/main/Cloneable';
import {Equatable} from '@monument/core/main/Equatable';
import {EqualityComparator} from '@monument/core/main/EqualityComparator';
import {StrictEqualityComparator} from '@monument/core/main/StrictEqualityComparator';
import {ArgumentRangeException} from '@monument/core/main/exceptions/ArgumentRangeException';
import {List} from './List';
import {IteratorFunction} from './IteratorFunction';
import {AbstractList} from './AbstractList';
import {LinkedListNode} from './LinkedListNode';


type LinkedListIteratorFunction<TItem, TResult> = (node: LinkedListNode<TItem>, index: number) => TResult;


export class LinkedList<T> extends AbstractList<T> implements Cloneable<LinkedList<T>>, Equatable<List<T>> {
    private _length: number = 0;
    private _firstNode: LinkedListNode<T> | undefined;
    private _lastNode: LinkedListNode<T> | undefined;


    public get length(): number {
        return this._length;
    }


    public constructor(items?: Iterable<T>) {
        super();

        if (items != null) {
            this.addAll(items);
        }
    }


    // Enumerable interface implementation


    public get iterator(): Iterator<T> {
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

    public forEach(
        iterator: IteratorFunction<T, boolean | void>,
        startIndex: number = 0,
        count: number = this.length - startIndex
    ): void {
        this.validateSliceBounds(startIndex, count);

        let returnValue: boolean | void;

        for (let index = startIndex, node = this.getNodeAt(startIndex); count > 0 && node != null && returnValue !== false; count--, index++, node = node.nextNode) {
            returnValue = iterator(node.nodeValue, index);
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

        let returnValue: boolean | void;

        for (let index = startIndex, node = this.getNodeAt(startIndex); count > 0 && node != null && returnValue !== false; count--, index--, node = node.previousNode) {
            returnValue = iterator(node.nodeValue, index);
        }
    }


    // Cloneable interface implementation


    public clone(): LinkedList<T> {
        return new LinkedList(this);
    }


    // Equatable interface implementation


    public equals(
        otherList: List<T>,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): boolean {
        if (this.length !== otherList.length) {
            return false;
        }

        if (this.isEmpty) {
            return true;
        }

        let node: LinkedListNode<T> | undefined = this._firstNode;

        for (let otherItem of otherList) {
            if (node) {
                if (!comparator.equals(otherItem, node.nodeValue)) {
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


    public add(item: T): boolean {
        let newNode: LinkedListNode<T> = new LinkedListNode(item);

        newNode.link(this._lastNode, undefined);

        this._lastNode = newNode;

        if (this._firstNode == null) {
            this._firstNode = newNode;
        }

        this._length++;

        return true;
    }


    public remove(
        item: T,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): boolean {
        const node: LinkedListNode<T> | undefined = this.findNode(item, comparator);

        if (node == null) {
            return false;
        }

        this.removeNode(node);

        return true;
    }


    public removeAll(
        otherItems: Iterable<T>,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): boolean {
        const oldLength: number = this.length;

        for (let otherItem of otherItems) {
            this.forEachNode((node: LinkedListNode<T>) => {
                let currentItem: T = node.nodeValue;

                if (comparator.equals(currentItem, otherItem)) {
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
        let index: number = 0;

        while (currentNode) {
            let nextNode: LinkedListNode<T> | undefined = currentNode.nextNode;
            let remove: boolean = predicate(currentNode.nodeValue, index);

            if (remove) {
                this.removeNode(currentNode);
            }

            index++;

            currentNode = nextNode;
        }

        return this.length !== oldLength;
    }


    public clear(): boolean {
        if (this.isEmpty) {
            return false;
        }

        delete this._firstNode;
        delete this._lastNode;

        this._length = 0;

        return true;
    }


    // List interface implementation


    public getAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this);

        let node: LinkedListNode<T> = this.getNodeAt(index) as LinkedListNode<T>;

        return node.nodeValue;
    }


    public setAt(index: number, newValue: T): T {
        Assert.argument('index', index).isIndexOf(this);

        let node: LinkedListNode<T> = this.getNodeAt(index) as LinkedListNode<T>;
        let oldValue: T = node.nodeValue;

        node.nodeValue = newValue;

        return oldValue;
    }


    public insert(index: number, item: T): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.length);
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


    public insertAll(index: number, items: Iterable<T>): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.length);
        }

        const oldLength: number = this.length;

        for (let item of items) {
            this.insert(index, item);

            index++;
        }

        return this.length !== oldLength;
    }


    public indexOf(
        searchItem: T,
        startIndex: number = 0,
        count: number = this.length - startIndex,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): number {
        this.validateSliceBounds(startIndex, count);

        for (let index = startIndex, node = this.getNodeAt(startIndex); count > 0 && node != null; index++, count--, node = node.nextNode) {
            let currentItem: T = node.nodeValue;

            if (comparator.equals(currentItem, searchItem)) {
                return index;
            }
        }

        return -1;
    }


    public lastIndexOf(
        searchItem: T,
        startIndex: number = this.isEmpty ? 0 : this.length - 1,
        count?: number,
        comparator: EqualityComparator<T> = StrictEqualityComparator.instance
    ): number {

        // Start index and count are omitted

        if (startIndex == null && count == null) {
            for (let index = this.length - 1, node = this._lastNode; index >= 0 && node != null; index--, node = node.previousNode) {
                let currentItem: T = node.nodeValue;

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

            for (let index = startIndex, node = this.getNodeAt(startIndex); index >= 0 && node != null; index--, node = node.previousNode) {
                let currentItem: T = node.nodeValue;

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

            for (let index = this.length - 1, node = this._lastNode; count > 0 && node != null; index--, count--, node = node.previousNode) {
                let currentItem: T = node.nodeValue;

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

            for (let index = startIndex, node = this.getNodeAt(startIndex); count > 0 && node != null; index--, count--, node = node.previousNode) {
                let currentItem: T = node.nodeValue;

                if (comparator.equals(searchItem, currentItem)) {
                    return index;
                }
            }
        }

        return -1;
    }


    protected createList<TItem>(items?: Iterable<TItem>): List<TItem> {
        return new LinkedList(items);
    }


    private forEachNode(iterator: LinkedListIteratorFunction<T, boolean | void>): void {
        let returnValue: boolean | void;
        let node: LinkedListNode<T> | undefined = this._firstNode;
        let index: number = 0;

        while (node) {
            let nextNode: LinkedListNode<T> | undefined = node.nextNode;

            returnValue = iterator(node, index);

            if (returnValue === false) {
                break;
            }

            index++;
            node = nextNode;
        }
    }


    private forEachNodeReversed(iterator: LinkedListIteratorFunction<T, boolean | void>): void {
        let returnValue: boolean | void;
        let node: LinkedListNode<T> | undefined = this._lastNode;
        let index: number = this.length - 1;

        while (node != null) {
            let nextNode = node.previousNode;

            returnValue = iterator(node, index);

            if (returnValue === false) {
                break;
            }

            index--;
            node = nextNode;
        }
    }


    private getNodeAt(searchIndex: number): LinkedListNode<T> | undefined {
        if (searchIndex < 0 || searchIndex >= this.length) {
            return;
        }

        // Optimization for first and last nodes.

        if (searchIndex === 0) {
            return this._firstNode;
        }

        if (searchIndex === this.length - 1) {
            return this._lastNode;
        }

        let foundNode: LinkedListNode<T> | undefined;
        let midIndex: number = Math.ceil(this.length / 2);

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


    private findNode(value: T, comparator: EqualityComparator<T> = StrictEqualityComparator.instance): LinkedListNode<T> | undefined {
        let result: LinkedListNode<T> | undefined;

        this.forEachNode((node: LinkedListNode<T>): boolean | void => {
            if (comparator.equals(node.nodeValue, value)) {
                result = node;

                return false;
            }
        });

        return result;
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
