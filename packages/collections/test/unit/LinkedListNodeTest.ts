import {BeforeEach} from '@monument/test-drive/main/configuration/decorators/BeforeEach';
import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {LinkedListNode} from '../../main/LinkedListNode';


export class LinkedListNodeTest {
    private static FIRST_VALUE = 'First';
    private static PREVIOUS_VALUE = 'Previous';
    private static CURRENT_VALUE = 'Current';
    private static NEXT_VALUE = 'Next';
    private static LAST_VALUE = 'Last';

    private firstNode!: LinkedListNode<string>;
    private previousNode!: LinkedListNode<string>;
    private currentNode!: LinkedListNode<string>;
    private nextNode!: LinkedListNode<string>;
    private lastNode!: LinkedListNode<string>;


    @BeforeEach
    public setUpTest() {
        this.firstNode = new LinkedListNode(LinkedListNodeTest.FIRST_VALUE);
        this.previousNode = new LinkedListNode(LinkedListNodeTest.PREVIOUS_VALUE);
        this.currentNode = new LinkedListNode(LinkedListNodeTest.CURRENT_VALUE);
        this.nextNode = new LinkedListNode(LinkedListNodeTest.NEXT_VALUE);
        this.lastNode = new LinkedListNode(LinkedListNodeTest.LAST_VALUE);
    }


    @Test
    public 'link() links node with both defined neighbours'(assert: Assert) {
        this.previousNode.link(this.firstNode, this.currentNode);
        this.currentNode.link(this.previousNode, this.nextNode);
        this.nextNode.link(this.currentNode, this.lastNode);

        assert.equals(this.firstNode.previousNode, undefined);
        assert.equals(this.firstNode.nextNode, this.previousNode);

        assert.equals(this.previousNode.previousNode, this.firstNode);
        assert.equals(this.previousNode.nextNode, this.currentNode);

        assert.equals(this.currentNode.previousNode, this.previousNode);
        assert.equals(this.currentNode.nextNode, this.nextNode);

        assert.equals(this.nextNode.previousNode, this.currentNode);
        assert.equals(this.nextNode.nextNode, this.lastNode);

        assert.equals(this.lastNode.previousNode, this.nextNode);
        assert.equals(this.lastNode.nextNode, undefined);
    }


    @Test
    public 'link() detaches node from previous neighbors'(assert: Assert) {
        this.currentNode.link(this.previousNode, this.nextNode);

        assert.equals(this.currentNode.previousNode, this.previousNode);
        assert.equals(this.currentNode.nextNode, this.nextNode);

        this.currentNode.link(this.firstNode, this.lastNode);

        assert.equals(this.currentNode.previousNode, this.firstNode);
        assert.equals(this.currentNode.nextNode, this.lastNode);

        assert.equals(this.firstNode.previousNode, undefined);
        assert.equals(this.firstNode.nextNode, this.currentNode);

        assert.equals(this.lastNode.previousNode, this.currentNode);
        assert.equals(this.lastNode.nextNode, undefined);

        assert.equals(this.nextNode.previousNode, this.previousNode);
        assert.equals(this.nextNode.nextNode, undefined);

        assert.equals(this.previousNode.previousNode, undefined);
        assert.equals(this.previousNode.nextNode, this.nextNode);
    }


    @Test
    public 'unlink() deletes references'(assert: Assert) {
        this.previousNode.link(this.firstNode, this.currentNode);
        this.currentNode.link(this.previousNode, this.nextNode);
        this.nextNode.link(this.currentNode, this.lastNode);

        assert.equals(this.currentNode.previousNode, this.previousNode);
        assert.equals(this.currentNode.nextNode, this.nextNode);

        this.currentNode.unlink();

        assert.equals(this.currentNode.previousNode, undefined);
        assert.equals(this.currentNode.nextNode, undefined);

        assert.equals(this.previousNode.previousNode, this.firstNode);
        assert.equals(this.previousNode.nextNode, this.nextNode);

        assert.equals(this.nextNode.previousNode, this.previousNode);
        assert.equals(this.nextNode.nextNode, this.lastNode);
    }
}
