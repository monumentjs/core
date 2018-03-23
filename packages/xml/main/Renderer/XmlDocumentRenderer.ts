import {IXmlNodeRenderer} from './IXmlNodeRenderer';
import {XmlNode} from '../DOM/XmlNode';
import {XmlDocument} from '../DOM/XmlDocument';
import {XmlChildNodesRenderer} from './XmlChildNodesRenderer';
import {StringBuilder} from '../../text/main/StringBuilder';


export class XmlDocumentRenderer implements IXmlNodeRenderer {
    private childNodesRenderer: XmlChildNodesRenderer;


    public constructor(childNodesRenderer: XmlChildNodesRenderer) {
        this.childNodesRenderer = childNodesRenderer;
    }


    public match(node: XmlNode): boolean {
        return node instanceof XmlDocument;
    }


    public render(source: XmlNode): string {
        let sb = new StringBuilder();

        sb.append('<?xml >');

        return this.childNodesRenderer.render(source);
    }

}
