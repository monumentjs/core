import {Node} from './Node';
import {AsyncResult} from '../../../types';


export interface IAsyncTreeWalker {
    visit(node: Node): AsyncResult;
}
