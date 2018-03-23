import {XmlNode} from './XmlNode';
import {StringBuilder} from '../../../text/main/StringBuilder';
import {ListMap} from '../../../collections/main/ListMap';


export class XmlNodeAttributes extends ListMap<string, string> {
    private _node: XmlNode;


    public get node(): XmlNode {
        return this._node;
    }


    public constructor(node: XmlNode) {
        super();

        this._node = node;
    }


    public clone(): XmlNodeAttributes {
        let clonedAttributes: XmlNodeAttributes = new XmlNodeAttributes(this._node);

        for (let attribute of this) {
            clonedAttributes.put(attribute.key, attribute.value);
        }

        return clonedAttributes;
    }


    public toString(): string {
        let stringBuilder: StringBuilder = new StringBuilder();

        for (let {key, value} of this) {
            value = value.replace(/"/g, '\\"');
            stringBuilder.append(` ${key}="${value}"`);
        }

        return stringBuilder.toString();
    }
}
