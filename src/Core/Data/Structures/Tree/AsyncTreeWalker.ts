import {Node} from './Node';
import {IAsyncTreeWalker} from './IAsyncTreeWalker';
import {AsyncResult} from '../../../types';


export abstract class AsyncTreeWalker implements IAsyncTreeWalker {
    public async visit(node: Node): AsyncResult {
        await this.visitNode(node);

        for (let childNode of node.childNodes) {
            await this.visit(childNode);
        }
    }


    protected abstract visitNode(node: Node): AsyncResult;
}
