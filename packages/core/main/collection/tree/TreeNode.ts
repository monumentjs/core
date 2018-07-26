import {InvalidArgumentException} from '../../exceptions/InvalidArgumentException';
import {ReadOnlyList} from '../readonly/ReadOnlyList';
import {TreeNodeList} from './TreeNodeList';
import {Sequence} from '../readonly/Sequence';
import {NEGATIVE_ONE, ZERO} from '@monument/core/main/Constants';


export class TreeNode<TValue> implements Sequence<TValue> {
    private readonly _childNodes: TreeNodeList<TValue>;
    private _parentNode: TreeNode<TValue> | undefined;
    private _value: TValue;


    public get value(): TValue {
        return this._value;
    }


    public set value(value: TValue) {
        this._value = value;
    }


    public get parentNode(): TreeNode<TValue> | undefined {
        return this._parentNode;
    }


    public set parentNode(nextParent: TreeNode<TValue> | undefined) {
        const previousParent: TreeNode<TValue> | undefined = this._parentNode;

        if (this._parentNode !== nextParent) {
            this._parentNode = nextParent;

            if (nextParent && !nextParent._childNodes.contains(this)) {
                nextParent._childNodes.add(this);
            }

            if (!nextParent && previousParent && previousParent._childNodes.contains(this)) {
                previousParent._childNodes.remove(this);
            }
        }
    }


    public get childNodes(): ReadOnlyList<TreeNode<TValue>> {
        return this._childNodes;
    }


    public get hasChildNodes(): boolean {
        return this.childNodes.isEmpty === false;
    }


    public get firstChild(): TreeNode<TValue> | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(ZERO);
        } else {
            return undefined;
        }
    }


    public get lastChild(): TreeNode<TValue> | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(this.childNodes.lastIndex);
        } else {
            return undefined;
        }
    }


    public get nextSibling(): TreeNode<TValue> | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode + 1);
    }


    public get previousSibling(): TreeNode<TValue> | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode - 1);
    }


    public get depth(): number {
        let depth = ZERO;
        let parentNode: TreeNode<TValue> | undefined = this.parentNode;

        while (parentNode != null) {
            depth += 1;
            parentNode = parentNode.parentNode;
        }

        return depth;
    }


    public get length(): number {
        return this._childNodes.length;
    }


    public constructor(value: TValue, childNodes?: Sequence<TreeNode<TValue>>) {
        this._value = value;
        this._childNodes = new TreeNodeList(this, childNodes);
    }


    public addChild(node: TreeNode<TValue>): void {
        this._childNodes.add(node);
    }


    public removeChild(node: TreeNode<TValue>): boolean {
        return this._childNodes.remove(node);
    }


    public replaceChild(newNode: TreeNode<TValue>, refNode: TreeNode<TValue>): void {
        const indexOfOldNode: number = this.childNodes.indexOf(refNode);

        if (indexOfOldNode < NEGATIVE_ONE) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this._childNodes.insert(indexOfOldNode, newNode);
    }


    public contains(node: TreeNode<TValue>): boolean {
        if (node === this) {
            return false;
        }

        let parentNode: TreeNode<TValue> | undefined = node.parentNode;

        while (parentNode) {
            if (parentNode === this) {
                return true;
            }

            parentNode = parentNode.parentNode;
        }

        return false;
    }


    public insertBefore(newNode: TreeNode<TValue>, refNode: TreeNode<TValue>): void {
        const insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < NEGATIVE_ONE) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this._childNodes.insert(insertPosition, newNode);
    }


    public insertAfter(newNode: TreeNode<TValue>, refNode: TreeNode<TValue>): void {
        const insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < NEGATIVE_ONE) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this._childNodes.insert(insertPosition + 1, newNode);
    }


    public [Symbol.iterator](): Iterator<TValue> {
        const iterator: IterableIterator<TreeNode<TValue>> = this.getNextNode();

        return {
            next: () => {
                const {done, value} = iterator.next();

                return {
                    done: done || value == null,
                    value: value ? value.value : undefined as any
                };
            }
        };
    }


    public *getNextNode(): IterableIterator<TreeNode<TValue>> {
        for (const node of this.childNodes) {
            yield node;
            yield *node.childNodes;
        }
    }
}
