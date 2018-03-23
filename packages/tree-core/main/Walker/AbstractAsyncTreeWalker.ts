import {TreeNode} from '../TreeNode';


export abstract class AbstractAsyncTreeWalker {
    public async visit(node: TreeNode): Promise<void> {
        await this.visitNode(node);

        for (let childNode of node.childNodes) {
            await this.visit(childNode);
        }
    }


    protected abstract visitNode(node: TreeNode): Promise<void>;
}
