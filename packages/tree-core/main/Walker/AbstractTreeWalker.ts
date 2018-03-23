import {TreeNode} from '../TreeNode';


export abstract class AbstractTreeWalker {
    public visit(node: TreeNode): void {
        this.visitNode(node);

        for (let childNode of node.childNodes) {
            this.visit(childNode);
        }
    }


    protected abstract visitNode(node: TreeNode): void;
}
