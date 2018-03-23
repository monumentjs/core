import {IXmlNodeRenderer} from './IXmlNodeRenderer';
import {XmlNode} from '../DOM/XmlNode';
import {XmlCharacterData} from '../DOM/XmlCharacterData';


export class XmlCharacterDataRenderer implements IXmlNodeRenderer {
    public match(node: XmlNode): boolean {
        return node instanceof XmlCharacterData;
    }


    public render(node: XmlNode): string {
        return `<![CDATA[${node.textContent}]]>`;
    }
}
