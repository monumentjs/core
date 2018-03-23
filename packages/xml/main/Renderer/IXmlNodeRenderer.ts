import {XmlNode} from '../DOM/XmlNode';


export interface IXmlNodeRenderer {
    match(node: XmlNode): boolean;

    render(node: XmlNode): string;
}
