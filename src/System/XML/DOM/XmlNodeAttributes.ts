import {Dictionary} from '../../../Core/Collections/Dictionary';
import {XmlNode} from './XmlNode';
import {StringBuilder} from '../../../Core/Text/StringBuilder';
import {Assert} from '../../../Core/Assertion/Assert';


export class XmlNodeAttributes extends Dictionary<string, string> {
    private _node: XmlNode;
    
    
    public get node(): XmlNode {
        return this._node;
    }
    
    
    public constructor(node: XmlNode) {
        super();

        Assert.argument('node', node).notNull();
        
        this._node = node;
    }
    
    
    public clone(): XmlNodeAttributes {
        let clonedAttributes: XmlNodeAttributes = new XmlNodeAttributes(this._node);
        
        for (let attribute of this) {
            clonedAttributes.set(attribute.key, attribute.value);
        }
        
        return clonedAttributes;
    }
    
    
    public toString(): string {
        let stringBuilder: StringBuilder = new StringBuilder();
        let index = 0;
        
        for (let {key, value} of this) {
            value = value.replace(/"/g, '\\"');
            stringBuilder.append(` ${key}="${value}"`);
            index++;
        }
     
        return stringBuilder.toString();
    }
}
