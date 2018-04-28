import {InvalidArgumentException} from '@monument/core/main/exceptions/InvalidArgumentException';
import {NodeList} from './NodeList';


export class TreeNode<TValue> implements Iterable<TValue> {
    private readonly _childNodes: NodeList<TValue> = new NodeList(this);
    private _parentNode: TreeNode<TValue> | undefined;
    private _name: string;
    private _value: TValue;


    public get name(): string {
        return this._name;
    }


    public set name(value: string) {
        this._name = value;
    }


    public get value(): TValue {
        return this._value;
    }


    public set value(value: TValue) {
        this._value = value;
    }


    public set parentNode(value: TreeNode<TValue> | undefined) {
        if (this._parentNode === value) {
            return;
        }

        if (this._parentNode) {
            this._parentNode.removeChild(this);
        }

        this._parentNode = value;

        if (this._parentNode && !this._parentNode.contains(this)) {
            this._parentNode.addChild(this);
        }
    }


    public get childNodes(): NodeList<TValue> {
        return this._childNodes;
    }


    public get hasChildNodes(): boolean {
        return this.childNodes.length > 0;
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


    public get firstChild(): TreeNode<TValue> | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(0);
        } else {
            return undefined;
        }
    }


    public get lastChild(): TreeNode<TValue> | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(this.childNodes.length - 1);
        } else {
            return undefined;
        }
    }


    public get depth(): number {
        let depth = 0;
        let parentNode: TreeNode<TValue> | undefined = this.parentNode;

        while (parentNode != null) {
            depth += 1;
            parentNode = parentNode.parentNode;
        }

        return depth;
    }


    public constructor(name: string, value: TValue) {
        this._name = name;
        this._value = value;
    }


    public addChild(node: TreeNode<TValue>): void {
        this.childNodes.add(node);
    }


    public removeChild(node: TreeNode<TValue>): boolean {
        return this.childNodes.remove(node);
    }


    public replaceChild(newNode: TreeNode<TValue>, refNode: TreeNode<TValue>): void {
        let indexOfOldNode: number = this.childNodes.indexOf(refNode);

        if (indexOfOldNode < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(indexOfOldNode, newNode);
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
        let insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(insertPosition, newNode);
    }


    public insertAfter(newNode: TreeNode<TValue>, refNode: TreeNode<TValue>): void {
        let insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(insertPosition + 1, newNode);
    }


    public [Symbol.iterator](): Iterator<TValue> {
        let node = this.getNextNode();

        return {
            next: () => {
                let {done, value} = node.next();

                return {
                    done: done,
                    value: value ? value.value : undefined as any
                };
            }
        };
    }


    private *getNextNode(): IterableIterator<TreeNode<TValue>> {
        for (const node of this.childNodes) {
            yield node;
            yield *node.childNodes;
        }
    }

}
