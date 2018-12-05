import {InvalidArgumentException} from '../../exceptions/InvalidArgumentException';
import {ReadOnlyList} from '../list/readonly/ReadOnlyList';
import {Sequence} from '../base/Sequence';
import {LinkedMap} from '../map/mutable/LinkedMap';
import {Map} from '../map/mutable/Map';
import {ReadOnlyMap} from '../map/readonly/ReadOnlyMap';
import {Key} from '../attributes/Key';
import {AttributeAccessor} from '../attributes/mutable/AttributeAccessor';
import {ArrayList} from '../list/mutable/ArrayList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class TreeNode implements AttributeAccessor {
    private readonly _childNodes: ArrayList<TreeNode>;
    private readonly _attributes: Map<Key<any>, any> = new LinkedMap();
    private _parentNode: TreeNode | undefined;

    public get attributes(): ReadOnlyMap<Key<any>, any> {
        return this._attributes;
    }

    public get childNodes(): ReadOnlyList<TreeNode> {
        return this._childNodes;
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

    public set parentNode(parentNode: TreeNode | undefined) {
        /*tslint:disable:cyclomatic-complexity*/
        const previousParent: TreeNode | undefined = this._parentNode;

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

    public get previousSibling(): TreeNode | undefined {
        let indexOfCurrentNode: number;

        if (!this.parentNode) {
            return undefined;
        }

        indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

        return this.parentNode.childNodes.getAt(indexOfCurrentNode - 1);
    }

    public constructor(childNodes?: Sequence<TreeNode>) {
        this._childNodes = new ArrayList(childNodes);
    }

    public addChild(node: TreeNode): void {
        node.parentNode = this;

        this._childNodes.addIfAbsent(node);
    }

    public getAttribute<A>(token: Key<A>): A | undefined {
        return this._attributes.get(token);
    }

    public hasAttribute<A>(token: Key<A>): boolean {
        return this._attributes.containsKey(token);
    }

    public hasChild(node: TreeNode): boolean {
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

    public insertAfter(newNode: TreeNode, refNode: TreeNode): void {
        const insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        newNode.parentNode = this;

        this._childNodes.insert(insertPosition + 1, newNode);
    }

    public insertBefore(newNode: TreeNode, refNode: TreeNode): void {
        const insertPosition: number = this.childNodes.indexOf(refNode);

        if (insertPosition < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        newNode.parentNode = this;

        this._childNodes.insert(insertPosition, newNode);
    }

    public removeAttribute<A>(token: Key<A>): A | undefined {
        return this._attributes.remove(token);
    }

    public removeChild(node: TreeNode): boolean {
        node.parentNode = undefined;

        return this._childNodes.remove(node);
    }

    public replaceChild(newNode: TreeNode, refNode: TreeNode): void {
        const indexOfOldNode: number = this.childNodes.indexOf(refNode);

        if (indexOfOldNode < -1) {
            throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
        }

        this._childNodes.insert(indexOfOldNode, newNode);
    }

    public setAttribute<A>(token: Key<A>, value: A): A | undefined {
        return this._attributes.put(token, value);
    }
}
