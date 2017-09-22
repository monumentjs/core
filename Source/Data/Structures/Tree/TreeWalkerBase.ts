import {ITreeWalker} from './Abstraction/ITreeWalker';
import {INode} from './Abstraction/INode';


export abstract class TreeWalkerBase implements ITreeWalker {
    public visit(node: INode): void {
        this.visitNode(node);

        for (let childNode of node.childNodes) {
            this.visit(childNode);
        }
    }


    protected abstract visitNode(node: INode): void;
}
