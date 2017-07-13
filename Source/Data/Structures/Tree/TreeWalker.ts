import {ITreeWalker} from './ITreeWalker';
import {INode} from './INode';


export abstract class TreeWalker implements ITreeWalker {
    public visit(node: INode): void {
        this.visitNode(node);

        for (let childNode of node.childNodes) {
            this.visit(childNode);
        }
    }


    protected abstract visitNode(node: INode): void;
}
