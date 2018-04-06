import {IXmlNodeRenderer} from './Renderer/IXmlNodeRenderer';
import {XmlNode} from './main/DOM/XmlNode';
import {XmlNodeRenderer} from './Renderer/XmlNodeRenderer';
import {XmlChildNodesRenderer} from './Renderer/XmlChildNodesRenderer';
import {XmlDocumentRenderer} from './Renderer/XmlDocumentRenderer';
import {XmlCharacterDataRenderer} from './Renderer/XmlCharacterDataRenderer';
import {XmlCommentRenderer} from './Renderer/XmlCommentRenderer';
import {XmlTextNodeRenderer} from './Renderer/XmlTextNodeRenderer';
import {List} from '../collections/main/List';


export class XmlRenderer {
    private childNodesRenderer: XmlChildNodesRenderer = new XmlChildNodesRenderer(this);
    private nodeRendererList: List<IXmlNodeRenderer> = new List<IXmlNodeRenderer>([
        new XmlDocumentRenderer(this.childNodesRenderer),
        new XmlCharacterDataRenderer(),
        new XmlCommentRenderer(),
        new XmlTextNodeRenderer()
    ]);
    private fallbackRenderer: IXmlNodeRenderer = new XmlNodeRenderer(this.childNodesRenderer);


    public render(node: XmlNode): string {
        let render: IXmlNodeRenderer = this.getNodeRenderer(node);

        return render.render(node);
    }


    private getNodeRenderer(node: XmlNode): IXmlNodeRenderer {
        let nodeRenderer: IXmlNodeRenderer | undefined = this.nodeRendererList.first((renderer: IXmlNodeRenderer): boolean => {
            return renderer.match(node);
        });

        return nodeRenderer || this.fallbackRenderer;
    }
}
