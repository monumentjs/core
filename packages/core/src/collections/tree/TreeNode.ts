import { InvalidArgumentException } from '../../exceptions/InvalidArgumentException';
import { ReadOnlyList } from '../list/readonly/ReadOnlyList';
import { ArrayList } from '../list/mutable/ArrayList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class TreeNode {
    private readonly _childNodes: ArrayList<TreeNode> = new ArrayList();
    private _parentNode: TreeNode | undefined;

    public get childNodes(): ReadOnlyList<TreeNode> {
        return this._childNodes;
    }

    public get childNodesCount(): number {
        return this._childNodes.length;
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

    public get firstChild(): TreeNode | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(0);
        } else {
            return undefined;
        }
    }

    public get hasChildNodes(): boolean {
        return this.childNodes.isEmpty === false;
    }

    public get isDetached(): boolean {
        return this._parentNode == null;
    }

    public get lastChild(): TreeNode | undefined {
        if (this.hasChildNodes) {
            return this.childNodes.getAt(this.childNodes.lastIndex);
        } else {
            return undefined;
        }
    }

    public get nextSibling(): TreeNode | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode + 1);
    }

    public get parentNode(): TreeNode | undefined {
        return this._parentNode;
    }

    public get path(): Iterable<TreeNode> {
        return this.getPath();
    }

    public get previousSibling(): TreeNode | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode - 1);
    }

    public addChild(node: TreeNode): boolean {
        if (this.hasChild(node)) {
            return false;
        }

        node.detach();
        node._parentNode = this;

        return this._childNodes.add(node);
    }

    public addChildren(nodes: Iterable<TreeNode>): boolean {
        let modified = false;

        for (const node of nodes) {
            if (this.addChild(node)) {
                modified = true;
            }
        }

        return modified;
    }

    public detach(): void {
        if (this._parentNode) {
            this._parentNode._childNodes.remove(this);
            this._parentNode = undefined;
        }
    }

    public hasChild(node: TreeNode): boolean {
        return this._childNodes.contains(node);
    }

    public insertAfter(newNode: TreeNode, refNode: TreeNode): void {
        const insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        newNode.detach();
        newNode._parentNode = this;

        this._childNodes.insert(insertPosition + 1, newNode);
    }

    public insertBefore(newNode: TreeNode, refNode: TreeNode): void {
        const insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        newNode.detach();
        newNode._parentNode = this;

        this._childNodes.insert(insertPosition, newNode);
    }

    public removeChild(node: TreeNode): boolean {
        if (!this.hasChild(node)) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        node.detach();

        return true;
    }

    public removeChildren(nodes: Iterable<TreeNode>): boolean {
        let modified = false;

        for (const node of nodes) {
            if (this.removeChild(node)) {
                modified = true;
            }
        }

        return modified;
    }

    public replaceChild(newNode: TreeNode, refNode: TreeNode): void {
        const indexOfOldNode: number = this.childNodes.indexOf(refNode);

        if (indexOfOldNode < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        this.insertAfter(newNode, refNode);

        refNode.detach();
    }

    private *getPath(): Iterable<TreeNode> {
        let node: TreeNode | undefined = this;

        while (node) {
            yield node;

            node = node.parentNode;
        }
    }
}
