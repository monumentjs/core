import {IXmlNodeRenderer} from './IXmlNodeRenderer';
import {XmlNode} from '../DOM/XmlNode';
import {StringBuilder} from '../../../Core/Text/StringBuilder';
import {XmlChildNodesRenderer} from './XmlChildNodesRenderer';


export class XmlNodeRenderer implements IXmlNodeRenderer {
    private childNodesRenderer: XmlChildNodesRenderer;


    public constructor(childNodesRenderer: XmlChildNodesRenderer) {
        this.childNodesRenderer = childNodesRenderer;
    }


    public match(node: XmlNode): boolean {
        return node instanceof XmlNode;
    }


    public render(node: XmlNode): string {
        let stringBuilder: StringBuilder = new StringBuilder();

        stringBuilder.append(`<${node.nodeName}`);

        if (node.attributes.length > 0) {
            stringBuilder.appendObject(node.attributes);
        }

        if (node.childNodes.length) {
            stringBuilder.appendLine(`>`);
            stringBuilder.appendObject(node.childNodes);
            stringBuilder.appendLine('');
            stringBuilder.append(`</${node.nodeName}>`);
        } else if (node.nodeName === '?xml') {          // TODO: use string constants for types started with ?xml
            stringBuilder.append(` ?>`);
        } else {
            stringBuilder.append(` />`);
        }

        return stringBuilder.toString();
    }
}
