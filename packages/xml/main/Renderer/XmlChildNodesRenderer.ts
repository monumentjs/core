import {XmlNode} from '../DOM/XmlNode';
import {XmlRenderer} from '../XmlRenderer';
import {StringBuilder} from '../../text/main/StringBuilder';


export class XmlChildNodesRenderer {
    private xmlRenderer: XmlRenderer;


    public constructor(xmlRenderer: XmlRenderer) {
        this.xmlRenderer = xmlRenderer;
    }


    public render(node: XmlNode): string {
        let builder: StringBuilder = new StringBuilder();

        for (let childNode of node.childNodes) {
            builder.append(this.xmlRenderer.render(childNode as XmlNode));
        }

        return builder.toString();
    }
}
