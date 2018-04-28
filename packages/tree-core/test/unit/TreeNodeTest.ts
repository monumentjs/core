import {Assert} from '@monument/test-drive/main/assert/Assert';
import {MockFactory} from '@monument/test-drive/main/mock/MockFactory';
import {FunctionMock} from '@monument/test-drive/main/mock/FunctionMock';
import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {BeforeEach} from '@monument/test-drive/main/configuration/decorators/BeforeEach';
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
    public 'iteration over the tree'(assert: Assert, mockFactory: MockFactory) {
        const mock: FunctionMock<(node: string) => void> = mockFactory.function();

        for (const value of this.html) {
            mock.value(value);
        }

        assert.equals(mock.calls.length, 3);
        assert.true(mock.calls.getAt(0).testArguments(['head']));
        assert.true(mock.calls.getAt(1).testArguments(['body']));
        assert.true(mock.calls.getAt(2).testArguments(['main']));
    }
}
