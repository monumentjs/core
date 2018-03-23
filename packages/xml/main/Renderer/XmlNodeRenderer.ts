import {IXmlNodeRenderer} from './IXmlNodeRenderer';
import {XmlNode} from '../DOM/XmlNode';
import {XmlChildNodesRenderer} from './XmlChildNodesRenderer';
import {StringBuilder} from '../../text/main/StringBuilder';


export class XmlNodeRenderer implements IXmlNodeRenderer {
    private childNodesRenderer: XmlChildNodesRenderer;


    public constructor(childNodesRenderer: XmlChildNodesRenderer) {
        this.childNodesRenderer = childNodesRenderer;
    }


    public match(node: XmlNode): boolean {
        return node instanceof XmlNode;
    }


    public render(node: XmlNode): string {
        let sb: StringBuilder = new StringBuilder();

        sb.append(`<${node.nodeName}`);

        if (node.attributes.length > 0) {
            sb.appendObject(node.attributes);
        }

        if (node.childNodes.length) {
            sb.appendLine(`>`);
            sb.appendObject(node.childNodes);
            sb.appendLine('');
            sb.append(`</${node.nodeName}>`);
        } else if (node.nodeName === '?xml') {          // TODO: use string constants for types started with ?xml
            sb.append(` ?>`);
        } else {
            sb.append(` />`);
        }

        return sb.toString();
    }
}
