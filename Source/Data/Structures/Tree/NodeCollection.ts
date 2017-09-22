import {Collection} from '../../../Collections/Collection';
import {Node} from './Node';
import {Assert} from '../../../Assertion/Assert';


export class NodeCollection<TNode extends Node = Node> extends Collection<TNode> {
    public readonly parentNode: TNode;


    public constructor(parentNode: TNode) {
        super();

        this.parentNode = parentNode;
    }


    public add(node: TNode): boolean {
        node.parentNode = this.parentNode;

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


    public indexOf(node: TNode, fromIndex?: number | undefined): number {
        return Array.prototype.indexOf.call(this, node, fromIndex);
    }


    public lastIndexOf(node: TNode, fromIndex?: number): number {
        return Array.prototype.lastIndexOf.call(this, node, fromIndex);
    }


    public insert(node: TNode, position: number): boolean {
        Assert.argument('position', position).bounds(0, this.length);

        node.parentNode = this.parentNode;

        Array.prototype.splice.call(this, position, 0, node);

        return true;
    }
}
