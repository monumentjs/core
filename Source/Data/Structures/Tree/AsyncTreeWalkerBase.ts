import {Node} from './Node';
import {IAsyncTreeWalker} from './Abstraction/IAsyncTreeWalker';


export abstract class AsyncTreeWalkerBase implements IAsyncTreeWalker {
    public async visit(node: Node): Promise<void> {
        await this.visitNode(node);

        for (let childNode of node.childNodes) {
            await this.visit(childNode);
        }
    }


    protected abstract visitNode(node: Node): Promise<void>;
}
