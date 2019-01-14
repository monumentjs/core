import {InvalidArgumentException} from '../../exceptions/InvalidArgumentException';
import {ReadOnlyList} from '../list/readonly/ReadOnlyList';
import {ArrayList} from '../list/mutable/ArrayList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class TreeNode<T> {
    private readonly _childNodes: ArrayList<TreeNode<T>> = new ArrayList();
    private _parentNode: TreeNode<T> | undefined;
    private _value: T;

    public get childNodes(): ReadOnlyList<TreeNode<T>> {
        return this._childNodes;
    }

    public get depth(): number {
        let depth = 0;
        let parentNode: TreeNode<T> | undefined = this.parentNode;

        while (parentNode != null) {
            depth += 1;
            parentNode = parentNode.parentNode;
        }

        return depth;
    }

    public get firstChild(): TreeNode<T> | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(0);
        } else {
            return undefined;
        }
    }

    public get hasChildNodes(): boolean {
        return this.childNodes.isEmpty === false;
    }

    public get lastChild(): TreeNode<T> | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(this.childNodes.lastIndex);
        } else {
            return undefined;
        }
    }

    public get nextSibling(): TreeNode<T> | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode + 1);
    }

    public get parentNode(): TreeNode<T> | undefined {
        return this._parentNode;
    }

    public set parentNode(parentNode: TreeNode<T> | undefined) {
        const previousParent: TreeNode<T> | undefined = this._parentNode;

        if (this._parentNode !== parentNode) {
            this._parentNode = parentNode;

            if (parentNode && !parentNode._childNodes.contains(this)) {
                parentNode._childNodes.add(this);
            }

            if (!parentNode && previousParent && previousParent._childNodes.contains(this)) {
                previousParent._childNodes.remove(this);
            }
        }
    }

    public get previousSibling(): TreeNode<T> | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode - 1);
    }

    public get value(): T {
        return this._value;
    }

    public set value(value: T) {
        this._value = value;
    }

    public constructor(value: T) {
        this._value = value;
    }

    public addChild(node: TreeNode<T>): void {
        node.parentNode = this;

        this._childNodes.addIfAbsent(node);
    }

    public hasChild(node: TreeNode<T>): boolean {
        if (node === this) {
            return false;
        }

        let parentNode: TreeNode<T> | undefined = node.parentNode;

        while (parentNode) {
            if (parentNode === this) {
                return true;
            }

            parentNode = parentNode.parentNode;
        }

        return false;
    }

    public insertAfter(newNode: TreeNode<T>, refNode: TreeNode<T>): void {
        const insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        newNode.parentNode = this;

        this._childNodes.insert(insertPosition + 1, newNode);
    }

    public insertBefore(newNode: TreeNode<T>, refNode: TreeNode<T>): void {
        const insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        newNode.parentNode = this;

        this._childNodes.insert(insertPosition, newNode);
    }

    public removeChild(node: TreeNode<T>): boolean {
        node.parentNode = undefined;

        return this._childNodes.remove(node);
    }

    public replaceChild(newNode: TreeNode<T>, refNode: TreeNode<T>): void {
        const indexOfOldNode: number = this.childNodes.indexOf(refNode);

        if (indexOfOldNode < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        this._childNodes.insert(indexOfOldNode, newNode);
    }
}
