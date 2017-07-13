import { NodeCollection } from './NodeCollection';
import { INode } from './INode';
export declare class Node implements INode {
    protected _textContent: string;
    protected _parentNode: Node;
    protected _childNodes: NodeCollection;
    protected _nodeName: string;
    readonly nodeName: string;
    parentNode: Node;
    readonly childNodes: NodeCollection;
    readonly hasChildNodes: boolean;
    readonly nextSibling: Node;
    readonly previousSibling: Node;
    readonly firstChild: Node;
    readonly lastChild: Node;
    textContent: string;
    readonly depth: number;
    constructor(nodeName: string);
    addChild(node: Node): void;
    removeChild(node: Node): boolean;
    replaceChild(newNode: Node, oldNode: Node): void;
    contains(node: Node): boolean;
    insertBefore(newNode: Node, refNode: Node): void;
    insertAfter(newNode: Node, refNode: Node): void;
}
