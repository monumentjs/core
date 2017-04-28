import {XMLNodeList} from './XMLNodeList';
import {XMLNodeAttributes} from './XMLNodeAttributes';
import {ICloneable} from '../../Core/types';
import {StringBuilder} from '../../Core/Text/StringBuilder';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export class XMLNode implements ICloneable<XMLNode> {
    private _type: string = '';
    private _parentNode: XMLNode = null;
    private _childNodes: XMLNodeList = new XMLNodeList(this);
    private _attributes: XMLNodeAttributes = new XMLNodeAttributes(this);
    
    
    public get type(): string {
        return this._type;
    }
    
    
    public get attributes(): XMLNodeAttributes {
        return this._attributes;
    }
    
    
    public get childNodes(): XMLNodeList {
        return this._childNodes;
    }
    
    
    public get hasChildNodes(): boolean {
        return this.childNodes.length > 0;
    }
    
    
    public get parentNode(): XMLNode {
        return this._parentNode;
    }
    
    
    public set parentNode(parent: XMLNode) {
        this._parentNode = parent;
    }
    
    
    public get level(): number {
        let level = 0;
        let parentNode: XMLNode = this.parentNode;
        
        while (parentNode) {
            level += 1;
            parentNode = parentNode.parentNode;
        }
        
        return level;
    }
    
    
    protected get textIndentation(): number {
        return (this.level - 1) * 4;
    }
    
    
    public constructor(type: string) {
        assertArgumentNotNull('type', type);

        this._type = type;
    }
    
    
    public clone(): XMLNode {
        let clonedNode: XMLNode = new XMLNode(this.type);
        
        clonedNode._parentNode = this.parentNode;
        clonedNode._childNodes = this.childNodes.clone();
        clonedNode._attributes = this.attributes.clone();
        
        return clonedNode;
    }
    
    
    public toString(): string {
        let stringBuilder: StringBuilder = new StringBuilder();
        
        stringBuilder.appendTimes(' ', this.textIndentation);
        stringBuilder.append(`<${this._type}`);
        
        if (this._attributes.length > 0) {
            stringBuilder.appendObject(this._attributes);
        }
        
        if (this.childNodes.length) {
            stringBuilder.appendLine(`>`);
            stringBuilder.appendObject(this.childNodes);
            stringBuilder.appendLine('');
            stringBuilder.appendTimes(' ', this.textIndentation);
            stringBuilder.append(`</${this.type}>`);
        } else if (this.type === '?xml') {          // TODO: use string constants for types started with ?xml
            stringBuilder.append(` ?>`);
        } else {
            stringBuilder.append(` />`);
        }
        
        return stringBuilder.toString();
    }
}

