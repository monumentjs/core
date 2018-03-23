import {InvalidArgumentException} from '@monument/core/main/exceptions/InvalidArgumentException';
import {NodeList} from './NodeList';


export class TreeNode {
    private _parentNode: TreeNode | undefined;
    private _childNodes: NodeList = new NodeList(this);


    public set parentNode(value: TreeNode | undefined) {
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


    public get nextSibling(): TreeNode | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode + 1);
    }


    public get previousSibling(): TreeNode | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode - 1);
    }


    public get firstChild(): TreeNode | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(0);
        } else {
            return undefined;
        }
    }


    public get lastChild(): TreeNode | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(this.childNodes.length - 1);
        } else {
            return undefined;
        }
    }


    public get depth(): number {
        let depth = 0;
        let parentNode: TreeNode | undefined = this.parentNode;

        while (parentNode != null) {
            depth += 1;
            parentNode = parentNode.parentNode;
        }

        return depth;
    }


    public addChild(node: TreeNode): void {
        this.childNodes.add(node);
    }


    public removeChild(node: TreeNode): boolean {
        return this.childNodes.remove(node);
    }


    public replaceChild(newNode: TreeNode, refNode: TreeNode): void {
        let indexOfOldNode: number = this.childNodes.indexOf(refNode);

        if (indexOfOldNode < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(indexOfOldNode, newNode);
    }


    public contains(node: TreeNode): boolean {
        if (node === this) {
            return false;
        }

        let parentNode: TreeNode | undefined = node.parentNode;

        while (parentNode) {
            if (parentNode === this) {
                return true;
            }

            parentNode = parentNode.parentNode;
        }

        return false;
    }


    public insertBefore(newNode: TreeNode, refNode: TreeNode): void {
        let insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(insertPosition, newNode);
    }


    public insertAfter(newNode: TreeNode, refNode: TreeNode): void {
        let insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < 0) {
            throw new InvalidArgumentException('refNode', 'Reference node is not a member of child nodes collection.');
        }

        this.childNodes.insert(insertPosition + 1, newNode);
    }
}
