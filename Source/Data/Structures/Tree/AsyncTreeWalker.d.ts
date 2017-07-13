import { Node } from './Node';
import { IAsyncTreeWalker } from './IAsyncTreeWalker';
export declare abstract class AsyncTreeWalker implements IAsyncTreeWalker {
    visit(node: Node): Promise<void>;
    protected abstract visitNode(node: Node): Promise<void>;
}
