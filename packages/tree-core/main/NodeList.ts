import {Assert} from '@monument/assert/main/Assert';
import {ObservableArrayList} from '@monument/observable/main/ObservableArrayList';
import {TreeNode} from './TreeNode';


export class NodeList<TNodeValue> extends ObservableArrayList<TreeNode<TNodeValue>> {
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

        return super.add(node);
    }


    public insert(position: number, node: TreeNode<TNodeValue>): boolean {
        Assert.argument('position', position).bounds(0, this.length);

        node.parentNode = this.parentNode;

        super.insert(position, node);

        return true;
    }


    public remove(node: TreeNode<TNodeValue>): boolean {
        if (super.remove(node)) {
            node.parentNode = undefined;

            return true;
        }

        return false;
    }


    public clear(): boolean {
        for (let node of this) {
            node.parentNode = undefined;
        }

        return super.clear();
    }
}
