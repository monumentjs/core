import {NodeCollection} from './NodeCollection';
import {Assert} from '../../../Assertion/Assert';
import {InvalidArgumentException} from '../../../Exceptions/InvalidArgumentException';
import {INode} from './INode';
import {EMPTY_STRING} from '../../../Text/constants';


export class Node implements INode {
    protected _textContent: string = EMPTY_STRING;
    protected _parentNode: Node = null;
    protected _childNodes: NodeCollection = new NodeCollection(this);
    protected _nodeName: string = EMPTY_STRING;


    public get nodeName(): string {
        return this._nodeName;
    }


    public get parentNode(): Node {
        return this._parentNode;
    }


    public set parentNode(value: Node) {
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


    public get childNodes(): NodeCollection {
        return this._childNodes;
    }


    public get hasChildNodes(): boolean {
        return this.childNodes.length > 0;
    }


    public get nextSibling(): Node {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return null;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes[indexOfCurrentNode + 1] || null;
    }


    public get previousSibling(): Node {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return null;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes[indexOfCurrentNode - 1] || null;
    }


    public get firstChild(): Node {
        if (this.hasChildNodes) {
            return this.childNodes[0];
        } else {
            return null;
        }
    }


    public get lastChild(): Node {
        if (this.hasChildNodes) {
            return this.childNodes[this.childNodes.length - 1];
        } else {
            return null;
        }
    }


    public get textContent(): string {
        return this._textContent;
    }


    public set textContent(value: string) {
        this._textContent = value;
    }


    public get depth(): number {
        let depth = 0;
        let parentNode: Node = this.parentNode;

        while (parentNode) {
            depth += 1;
            parentNode = parentNode.parentNode;
        }

        return depth;
    }


    public constructor(nodeName: string) {
        Assert.argument('nodeName', nodeName).notNull();

        this._nodeName = nodeName;
    }


    public addChild(node: Node): void {
        this.childNodes.add(node);
    }


    public removeChild(node: Node): boolean {
        return this.childNodes.remove(node);
    }


    public replaceChild(newNode: Node, refNode: Node): void {
        Assert.argument('newNode', newNode).notNull();
        Assert.argument('refNode', refNode).notNull();

        let indexOfOldNode: number = this.childNodes.indexOf(refNode);

        if (indexOfOldNode < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes[indexOfOldNode] = newNode;
    }


    public contains(node: Node): boolean {
        Assert.argument('node', node).notNull();

        if (node === this) {
            return false;
        }

        let parentNode: Node = node.parentNode;

        while (parentNode) {
            if (parentNode === this) {
                return true;
            }

            parentNode = parentNode.parentNode;
        }

        return false;
    }


    public insertBefore(newNode: Node, refNode: Node): void {
        Assert.argument('newNode', newNode).notNull();
        Assert.argument('refNode', refNode).notNull();

        let insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(newNode, insertPosition);
    }


    public insertAfter(newNode: Node, refNode: Node): void {
        Assert.argument('newNode', newNode).notNull();
        Assert.argument('refNode', refNode).notNull();

        let insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(newNode, insertPosition + 1);
    }
}
