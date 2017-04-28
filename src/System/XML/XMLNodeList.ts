import {List} from '../../Core/Collections/List';
import {XMLNode} from './XMLNode';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export class XMLNodeList extends List<XMLNode> {
    private _parentNode: XMLNode;
    
    
    public get parentNode(): XMLNode {
        return this._parentNode;
    }
    
    
    public constructor(parentNode: XMLNode) {
        super();

        assertArgumentNotNull('parentNode', parentNode);

        this._parentNode = parentNode;
    }
    
    
    public clone(): XMLNodeList {
        let clonedCollection: XMLNodeList = new XMLNodeList(this._parentNode);
        
        for (let childNode of this) {
            clonedCollection.add(childNode);
        }
        
        return clonedCollection;
    }
    
    
    public add(node: XMLNode): void {
        assertArgumentNotNull('node', node);

        node.parentNode = this._parentNode;
        
        super.add(node);
    }
    
    
    public remove(node: XMLNode): boolean {
        assertArgumentNotNull('node', node);

        node.parentNode = null;
        
        return super.remove(node);
    }
    
    
    public clear(): void {
        for (let node of this) {
            node.parentNode = null;
        }
        
        super.clear();
    }
    
    
    public toString(): string {
        return this.toArray().map((node: XMLNode): string => {
            return node.toString();
        }).join('\n');
    }
}
