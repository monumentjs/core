import {Collection} from '../../../Collections/Collection';
import {Node} from './Node';
import {Assert} from '../../../Assertion/Assert';


export class NodeCollection<TNode extends Node = Node> extends Collection<TNode> {
    public readonly parentNode: TNode;


    public constructor(parentNode: TNode) {
        Assert.argument('parentNode', parentNode).notNull();

        super();

        this.parentNode = parentNode;
    }


    public add(node: TNode): void {
        Assert.argument('node', node).notNull();

        node.parentNode = this.parentNode;

        super.add(node);
    }


    public remove(node: TNode): boolean {
        Assert.argument('node', node).notNull();

        let isRemoved: boolean = super.remove(node);

        if (isRemoved) {
            node.parentNode = null;
        }

        return isRemoved;
    }


    public contains(node: TNode): boolean {
        Assert.argument('node', node).notNull();

        return super.contains(node);
    }


    public clear(): void {
        for (let node of this) {
            node.parentNode = null;
        }

        super.clear();
    }


    public indexOf(node: TNode, fromIndex?: number): number {
        Assert.argument('node', node).notNull();

        return Array.prototype.indexOf.call(this, node, fromIndex);
    }


    public insert(node: TNode, position: number): void {
        Assert.argument('node', node).notNull();
        Assert.argument('position', position).notNull().bounds(0, this.length);

        node.parentNode = this.parentNode;

        Array.prototype.splice.call(this, position, 0, node);
    }
}
