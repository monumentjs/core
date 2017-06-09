import {IXmlNodeRenderer} from './IXmlNodeRenderer';
import {XmlNode} from '../DOM/XmlNode';
import {XmlChildNodesRenderer} from './XmlChildNodesRenderer';


export class XmlDocumentRenderer implements IXmlNodeRenderer {
    private childNodesRenderer: XmlChildNodesRenderer;


    public constructor(childNodesRenderer: XmlChildNodesRenderer) {
        this.childNodesRenderer = childNodesRenderer;
    }


    public match(node: XmlNode): boolean {
        return node instanceof XMLDocument;
    }


    public render(source: XmlNode): string {
        return '';
    }

}
