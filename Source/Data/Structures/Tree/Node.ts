import {NodeList} from './NodeList';
import {InvalidArgumentException} from '../../../Exceptions/InvalidArgumentException';
import {INode} from './Abstraction/INode';
import {EMPTY_STRING} from '../../../Text/constants';


export class Node implements INode {
    private _textContent: string = EMPTY_STRING;
    private _parentNode: Node | undefined;
    private _childNodes: NodeList = new NodeList(this);
    private _nodeName: string;


    public get nodeName(): string {
        return this._nodeName;
    }


    public get parentNode(): Node | undefined {
        return this._parentNode;
    }


    public set parentNode(value: Node | undefined) {
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


    public get childNodes(): NodeList {
        return this._childNodes;
    }


    public get hasChildNodes(): boolean {
        return this.childNodes.length > 0;
    }


    public get nextSibling(): Node | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes[indexOfCurrentNode + 1];
    }


    public get previousSibling(): Node | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes[indexOfCurrentNode - 1];
    }


    public get firstChild(): Node | undefined {
        if (this.hasChildNodes) {
            return this.childNodes[0] as Node;
        } else {
            return undefined;
        }
    }


    public get lastChild(): Node | undefined {
        if (this.hasChildNodes) {
            return this.childNodes[this.childNodes.length - 1] as Node;
        } else {
            return undefined;
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
        let parentNode: Node | undefined = this.parentNode;

        while (parentNode != null) {
            depth += 1;
            parentNode = parentNode.parentNode;
        }

        return depth;
    }


    public constructor(nodeName: string) {
        this._nodeName = nodeName;
    }


    public addChild(node: Node): void {
        this.childNodes.add(node);
    }


    public removeChild(node: Node): boolean {
        return this.childNodes.remove(node);
    }


    public replaceChild(newNode: Node, refNode: Node): void {
        let indexOfOldNode: number = this.childNodes.indexOf(refNode);

        if (indexOfOldNode < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(indexOfOldNode, newNode);
    }


    public contains(node: Node): boolean {
        if (node === this) {
            return false;
        }

        let parentNode: Node | undefined = node.parentNode;

        while (parentNode) {
            if (parentNode === this) {
                return true;
            }

            parentNode = parentNode.parentNode;
        }

        return false;
    }


    public insertBefore(newNode: Node, refNode: Node): void {
        let insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(insertPosition, newNode);
    }


    public insertAfter(newNode: Node, refNode: Node): void {
        let insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(insertPosition + 1, newNode);
    }
}
