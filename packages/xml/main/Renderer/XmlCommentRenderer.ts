import {IXmlNodeRenderer} from './IXmlNodeRenderer';
import {XmlNode} from '../DOM/XmlNode';
import {XmlComment} from '../DOM/XmlComment';


export class XmlCommentRenderer implements IXmlNodeRenderer {
    public match(node: XmlNode): boolean {
        return node instanceof XmlComment;
    }


    public render(node: XmlNode): string {
        return `<!--${node.textContent}-->`;
    }
}
