import {IXmlNodeRenderer} from './IXmlNodeRenderer';
import {XmlTextNode} from '../DOM/XmlTextNode';


export class XmlTextNodeRenderer implements IXmlNodeRenderer {
    public match(node: XmlTextNode): boolean {
        return node instanceof XmlTextNode;
    }


    public render(node: XmlTextNode): string {
        return node.textContent;
    }
}
