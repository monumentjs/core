import {Assert} from '@monument/test-drive/main/assert/Assert';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {TreeNode} from '../../main/TreeNode';


export class TreeNodeTest {
    private html!: TreeNode<string>;
    private head!: TreeNode<string>;
    private body!: TreeNode<string>;
    private main!: TreeNode<string>;


    @BeforeEach
    public setup() {
        this.html = new TreeNode('html', 'html');
        this.head = new TreeNode('head', 'head');
        this.body = new TreeNode('body', 'body');
        this.main = new TreeNode('main', 'main');

        this.html.addChild(this.head);
        this.html.addChild(this.body);
        this.body.addChild(this.main);
    }


    @Test
    public 'parent/child relation'(assert: Assert) {
        const parent: TreeNode<string> = new TreeNode('parent', 'parent');
        const child: TreeNode<string> = new TreeNode('child', 'child');

        assert.equals(parent.parentNode, undefined);
        assert.equals(parent.childNodes.length, 0);
        assert.equals(child.parentNode, undefined);
        assert.equals(child.childNodes.length, 0);

        child.parentNode = parent;

        assert.equals(parent.parentNode, undefined);
        assert.equals(parent.childNodes.length, 1);
        assert.equals(parent.childNodes.getAt(0), child);
        assert.equals(child.parentNode, parent);
        assert.equals(child.childNodes.length, 0);

        child.parentNode = undefined;

        assert.equals(parent.parentNode, undefined);
        assert.equals(parent.childNodes.length, 0);
        assert.equals(child.parentNode, undefined);
        assert.equals(child.childNodes.length, 0);
    }


    @Test
    public 'tree structure with child nodes'(assert: Assert) {
        assert.equals(this.html.parentNode, undefined);
        assert.equals(this.html.childNodes.length, 2);
        assert.equals(this.html.childNodes.getAt(0), this.head);
        assert.equals(this.html.childNodes.getAt(1), this.body);
        assert.equals(this.head.parentNode, this.html);
        assert.equals(this.head.childNodes.length, 0);
        assert.equals(this.body.parentNode, this.html);
        assert.equals(this.body.childNodes.length, 1);
        assert.equals(this.body.childNodes.getAt(0), this.main);
        assert.equals(this.main.parentNode, this.body);
        assert.equals(this.main.childNodes.length, 0);
    }


    @Test
    public 'iteration over the tree'(assert: Assert) {
        const mock: FunctionMock<(node: string) => void> = new FunctionMock();

        for (const value of this.html) {
            mock.value(value);
        }

        assert.equals(mock.calls.length, 3);
        assert.true(mock.calls.getAt(0).testArguments(['head']));
        assert.true(mock.calls.getAt(1).testArguments(['body']));
        assert.true(mock.calls.getAt(2).testArguments(['main']));
    }


    @Test
    public 'cast to array'(assert: Assert) {
        assert.identical([...this.html], ['head', 'body', 'main']);
    }
}
