import Dictionary from '../../Core/Collections/Dictionary';
import XMLNode from './XMLNode';
import StringBuilder from '../../System/Text/StringBuilder';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export default class XMLNodeAttributes extends Dictionary<string, string> {
    private _node: XMLNode;
    
    
    public get node(): XMLNode {
        return this._node;
    }
    
    
    public constructor(node: XMLNode) {
        super();

        assertArgumentNotNull('node', node);
        
        this._node = node;
    }
    
    
    public clone(): XMLNodeAttributes {
        let clonedAttributes: XMLNodeAttributes = new XMLNodeAttributes(this._node);
        
        for (let attribute of this) {
            clonedAttributes.add(attribute);
        }
        
        return clonedAttributes;
    }
    
    
    public toString(): string {
        let stringBuilder: StringBuilder = new StringBuilder();
        let index = 0;
        
        for (let {key, value} of this) {
            stringBuilder.append(` ${key}="${value}"`);
            index++;
        }
     
        return stringBuilder.toString();
    }
}
