import { Collection } from '../../../Collections/Collection';
import { Node } from './Node';
export declare class NodeCollection<TNode extends Node = Node> extends Collection<TNode> {
    readonly parentNode: TNode;
    constructor(parentNode: TNode);
    add(node: TNode): void;
    remove(node: TNode): boolean;
    contains(node: TNode): boolean;
    clear(): void;
    indexOf(node: TNode, fromIndex?: number): number;
    insert(node: TNode, position: number): void;
}
