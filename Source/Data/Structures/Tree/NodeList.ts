import {Node} from './Node';
import {Assert} from '../../../Assertion/Assert';
import {ObservableList} from '../../../Collections/Observable/ObservableList';


export class NodeList<TNode extends Node = Node> extends ObservableList<TNode> {
    private _parentNode: TNode;


    public get parentNode(): TNode {
        return this._parentNode;
    }


    public constructor(parentNode: TNode) {
        super();

        this._parentNode = parentNode;
    }


    public add(node: TNode): boolean {
        node.parentNode = this._parentNode;

        return super.add(node);
    }


    public remove(node: TNode): boolean {
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


    public insert(position: number, node: TNode): boolean {
        Assert.argument('position', position).bounds(0, this.length);

        node.parentNode = this._parentNode;

        Array.prototype.splice.call(this, position, 0, node);

        return true;
    }
}
