import { ITreeWalker } from './ITreeWalker';
import { INode } from './INode';
export declare abstract class TreeWalker implements ITreeWalker {
    visit(node: INode): void;
    protected abstract visitNode(node: INode): void;
}
