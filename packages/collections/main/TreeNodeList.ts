import {Assert} from '@monument/assert/main/Assert';
import {ArrayList} from './ArrayList';
import {TreeNode} from './TreeNode';


export class TreeNodeList<TNodeValue> extends ArrayList<TreeNode<TNodeValue>> {
    private readonly _parentNode: TreeNode<TNodeValue>;

    public get parentNode(): TreeNode<TNodeValue> {
        return this._parentNode;
    }


    public constructor(parentNode: TreeNode<TNodeValue>) {
        super();

        this._parentNode = parentNode;
    }


    public add(node: TreeNode<TNodeValue>): boolean {
        node.parentNode = this.parentNode;

        if (!this.contains(node)) {
            return super.add(node);
        }

        return false;
    }


    public insert(position: number, node: TreeNode<TNodeValue>): boolean {
        Assert.argument('position', position).bounds(0, this.length);

        node.parentNode = this.parentNode;

        if (!this.contains(node)) {
            super.insert(position, node);
        }

        return true;
    }


    public remove(node: TreeNode<TNodeValue>): boolean {
        const isRemoved: boolean = super.remove(node);

        if (isRemoved) {
            node.parentNode = undefined;
        }

        return isRemoved;
    }


    public clear(): boolean {
        for (let node of this) {
            node.parentNode = undefined;
        }

        return super.clear();
    }
}
