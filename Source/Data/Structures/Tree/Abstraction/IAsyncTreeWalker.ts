import {Node} from '../Node';


export interface IAsyncTreeWalker {
    visit(node: Node): Promise<void>;
}
