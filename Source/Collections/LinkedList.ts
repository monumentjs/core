import {LinkedListNode} from './LinkedListNode';
import {EqualityComparator} from '../Core/EqualityComparator';
import {IList} from './Abstraction/IList';
import {IEnumerable} from './Abstraction/IEnumerable';
import {IteratorFunction} from './IteratorFunction';
import {Assert} from '../Assertion/Assert';
import {ArgumentIndexOutOfBoundsException} from '../Exceptions/ArgumentIndexOutOfBoundsException';
import {RangeException} from '../Exceptions/RangeException';
import {ICloneable} from '../Core/Abstraction/ICloneable';
import {IEquatable} from '../Core/Abstraction/IEquatable';
import {IJSONSerializable} from '../Core/Abstraction/IJSONSerializable';
import {IEqualityComparator} from '../Core/Abstraction/IEqualityComparator';
import {Object} from '../Core/Object';


type LinkedListIteratorFunction<TItem, TResult> = (node: LinkedListNode<TItem>, index: number) => TResult;


export class LinkedList<T> extends Object implements IList<T>, ICloneable<LinkedList<T>>, IEquatable<LinkedList<T>>, IJSONSerializable<T[]> {
    [key: number]: T;

    private _length: number = 0;
    private _firstNode: LinkedListNode<T> | undefined;
    private _lastNode: LinkedListNode<T> | undefined;


    public get length(): number {
        return this._length;
    }


    public get isEmpty(): boolean {
        return this.length === 0;
    }


    public constructor(list?: IEnumerable<T>) {
        super();

        if (list) {
            this.addAll(list);
        }
    }


    public add(item: T): boolean {
        const node: LinkedListNode<T> = new LinkedListNode(item);

        let lastNode: LinkedListNode<T> | undefined = this._lastNode;

        node.previous = lastNode;

        if (lastNode) {
            lastNode.next = node;
        }

        if (this.length === 0) {
            this._firstNode = node;
        }

        this._length++;

        this._lastNode = node;

        return true;
    }


    public addAll(items: IEnumerable<T>): boolean {
        const oldLength: number = this.length;

        for (let item of items) {
            this.add(item);
        }

        return oldLength !== this.length;
    }


    public contains(item: T, comparator: IEqualityComparator<T> = EqualityComparator.instance): boolean {
        for (let currentItem of this) {
            if (comparator.equals(item, currentItem)) {
                return true;
            }
        }

        return false;
    }


    public containsAll(items: IEnumerable<T>, comparator: IEqualityComparator<T> = EqualityComparator.instance): boolean {
        for (let item of items) {
            if (this.contains(item, comparator) === false) {
                return false;
            }
        }

        return true;
    }


    public remove(
        item: T,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        const node: LinkedListNode<T> | undefined = this.findNode(item, comparator);

        if (node == null) {
            return false;
        }

        this.removeNode(node);

        return true;
    }


    public removeAll(
        items: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        const oldLength: number = this.length;

        for (let item of items) {
            this.remove(item, comparator);
        }

        return this.length !== oldLength;
    }


    public removeAt(index: number): T {
        Assert.argument('index', index).isIndexOf(this);

        const node: LinkedListNode<T> = this.getNodeAt(index) as LinkedListNode<T>;

        this.removeNode(node);

        return node.value;
    }


    public removeBy(predicate: IteratorFunction<T, boolean>): boolean {
        const oldLength: number = this.length;

        let currentNode: LinkedListNode<T> | undefined = this._firstNode;
        let index: number = 0;

        while (currentNode) {
            let nextNode: LinkedListNode<T> | undefined = currentNode.next;
            let remove: boolean = predicate(currentNode.value, index, this);

            if (remove) {
                this.removeNode(currentNode);
            }

            index++;

            currentNode = nextNode;
        }

        return this.length !== oldLength;
    }


    public retainAll(
        otherItems: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
    ): boolean {
        return this.removeBy((currentItem: T) => {
            let remove: boolean = true;

            for (let otherItem of otherItems) {
                if (comparator.equals(currentItem, otherItem)) {
                    remove = false;

                    break;
                }
            }

            return remove;
        });
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


    public insertAll(index: number, items: IEnumerable<T>): boolean {
        Assert.argument('index', index).isIndex();

        if (index > this.length) {
            throw new ArgumentIndexOutOfBoundsException('index', index, 0, this.length);
        }

        for (let item of items) {
            this.insert(index, item);

            index++;
        }

        return items.length > 0;
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

        const endIndex: number = startIndex + count;

        let index: number = -1;

        for (let item of this) {
            index += 1;

            if (index < startIndex) {
                continue;
            }

            if (comparator.equals(item, searchItem)) {
                return index;
            }

            if (index >= endIndex) {
                break;
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

        let currentNode: LinkedListNode<T> | undefined = this.getNodeAt(startIndex);

        while (count > 0) {
            if (currentNode) {
                if (comparator.equals(searchItem, currentNode.value)) {
                    return startIndex;
                }

                currentNode = currentNode.previous;
            }

            startIndex--;
            count--;
        }

        return -1;
    }


    public slice(offset: number, length: number): LinkedList<T> {
        Assert.argument('offset', offset).isIndex();
        Assert.argument('length', length).isLength();

        if (length !== 0) {
            Assert.sequence(this).containsSlice(offset, length);
        }

        const slice: LinkedList<T> = new LinkedList();

        let index: number = 0;

        for (let item of this) {
            if (index >= offset && index < offset + length) {
                slice.add(item);
            }

            index++;
        }

        return slice;
    }


    public clear(): boolean {
        if (this.isEmpty) {
            return false;
        }

        this.forEachNode((node: LinkedListNode<T>) => {
            node.unlink();
        });

        delete this._firstNode;
        delete this._lastNode;

        this._length = 0;

        return true;
    }


    public toArray(): T[] {
        let items: T[] = [];

        for (let item of this) {
            items.push(item);
        }

        return items;
    }


    public toJSON(): T[] {
        return this.toArray();
    }


    public clone(): LinkedList<T> {
        return new LinkedList(this);
    }


    public equals(
        otherList: IEnumerable<T>,
        comparator: IEqualityComparator<T> = EqualityComparator.instance
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
                if (!comparator.equals(otherItem, node.value)) {
                    return false;
                }

                node = node.next;
            } else {
                return false;
            }
        }

        return true;
    }


    public [Symbol.iterator](): Iterator<T> {
        let node: LinkedListNode<T> | undefined = this._firstNode;

        return {
            next: () => {
                let result;

                if (node) {
                    result = {
                        value: node.value,
                        done: false
                    };

                    node = node.next;
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


    private forEachNode(iterator: LinkedListIteratorFunction<T, boolean | void>): void {
        let node: LinkedListNode<T> | undefined = this._firstNode;
        let index: number = 0;

        while (node) {
            if (iterator(node, index) === false) {
                break;
            }

            index++;
            node = node.next;
        }
    }


    private getNodeAt(index: number): LinkedListNode<T> | undefined {
        let foundNode: LinkedListNode<T> | undefined;

        if (index < 0 || index >= this.length) {
            return;
        }

        this.forEachNode((node: LinkedListNode<T>, nodeIndex: number): boolean | void => {
            if (index === nodeIndex) {
                foundNode = node;

                return false;
            }
        });

        return foundNode;
    }


    private findNode(value: T, comparator: IEqualityComparator<T> = EqualityComparator.instance): LinkedListNode<T> | undefined {
        let result: LinkedListNode<T> | undefined;

        this.forEachNode((node: LinkedListNode<T>): boolean | void => {
            if (comparator.equals(node.value, value)) {
                result = node;

                return false;
            }
        });

        return result;
    }


    private removeNode(node: LinkedListNode<T>): void {
        if (this._firstNode === node) {
            this._firstNode = node.next;
        }

        if (this._lastNode === node) {
            this._lastNode = node.previous;
        }

        node.unlink();

        this._length--;
    }
}
