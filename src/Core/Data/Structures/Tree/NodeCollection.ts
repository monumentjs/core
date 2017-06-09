import {Collection} from '../../../Collections/Collection';
import {Node} from './Node';
import {assertArgumentBounds, assertArgumentNotNull} from '../../../Assertion/Assert';


export class NodeCollection<TNode extends Node = Node> extends Collection<TNode> {
    public readonly parentNode: TNode;


    public constructor(parentNode: TNode) {
        assertArgumentNotNull('parentNode', parentNode);

        super();

        this.parentNode = parentNode;
    }


    public add(node: TNode): void {
        assertArgumentNotNull('node', node);

        node.parentNode = this.parentNode;

        super.add(node);
    }


    public remove(node: TNode): boolean {
        assertArgumentNotNull('node', node);

        let isRemoved: boolean = super.remove(node);

        if (isRemoved) {
            node.parentNode = null;
        }

        return isRemoved;
    }


    public contains(node: TNode): boolean {
        assertArgumentNotNull('node', node);

        return super.contains(node);
    }


    public clear(): void {
        for (let node of this) {
            node.parentNode = null;
        }

        super.clear();
    }


    public indexOf(node: TNode, fromIndex?: number): number {
        assertArgumentNotNull('node', node);

        return Array.prototype.indexOf.call(this, node, fromIndex);
    }


    public insert(node: TNode, position: number): void {
        assertArgumentNotNull('node', node);
        assertArgumentNotNull('position', position);
        assertArgumentBounds('position', position, 0, this.length);

        node.parentNode = this.parentNode;

        Array.prototype.splice.call(this, position, 0, node);
    }
}
