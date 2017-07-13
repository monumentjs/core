import { INode } from './INode';
export interface ITreeWalker {
    visit(node: INode): void;
}
