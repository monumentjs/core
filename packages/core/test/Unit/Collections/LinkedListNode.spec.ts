import { LinkedListNode } from '../../../../collections/main/LinkedListNode';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { BeforeEach } from '@monument/test-drive/Decorators/BeforeEach';
import { Case } from '../../../../test-drive/Decorators/Case';


@Test()
export class LinkedListNodeSpec {
    private static FIRST_VALUE = 'First';
    private static PREVIOUS_VALUE = 'Previous';
    private static CURRENT_VALUE = 'Current';
    private static NEXT_VALUE = 'Next';
    private static LAST_VALUE = 'Last';

    private firstNode: LinkedListNode<string>;
    private previousNode: LinkedListNode<string>;
    private currentNode: LinkedListNode<string>;
    private nextNode: LinkedListNode<string>;
    private lastNode: LinkedListNode<string>;


    @BeforeEach()
    public setUpTest() {
        this.firstNode = new LinkedListNode(LinkedListNodeSpec.FIRST_VALUE);
        this.previousNode = new LinkedListNode(LinkedListNodeSpec.PREVIOUS_VALUE);
        this.currentNode = new LinkedListNode(LinkedListNodeSpec.CURRENT_VALUE);
        this.nextNode = new LinkedListNode(LinkedListNodeSpec.NEXT_VALUE);
        this.lastNode = new LinkedListNode(LinkedListNodeSpec.LAST_VALUE);
    }


    @Case()
    public 'link() links node with both defined neighbours'() {
        this.previousNode.link(this.firstNode, this.currentNode);
        this.currentNode.link(this.previousNode, this.nextNode);
        this.nextNode.link(this.currentNode, this.lastNode);

        expect(this.firstNode.previousNode).toBeUndefined();
        expect(this.firstNode.nextNode).toBe(this.previousNode);

        expect(this.previousNode.previousNode).toBe(this.firstNode);
        expect(this.previousNode.nextNode).toBe(this.currentNode);

        expect(this.currentNode.previousNode).toBe(this.previousNode);
        expect(this.currentNode.nextNode).toBe(this.nextNode);

        expect(this.nextNode.previousNode).toBe(this.currentNode);
        expect(this.nextNode.nextNode).toBe(this.lastNode);

        expect(this.lastNode.previousNode).toBe(this.nextNode);
        expect(this.lastNode.nextNode).toBeUndefined();
    }


    @Case()
    public 'link() detaches node from previous neighbors'() {
        this.currentNode.link(this.previousNode, this.nextNode);

        expect(this.currentNode.previousNode).toBe(this.previousNode);
        expect(this.currentNode.nextNode).toBe(this.nextNode);

        this.currentNode.link(this.firstNode, this.lastNode);

        expect(this.currentNode.previousNode).toBe(this.firstNode);
        expect(this.currentNode.nextNode).toBe(this.lastNode);

        expect(this.firstNode.previousNode).toBeUndefined();
        expect(this.firstNode.nextNode).toBe(this.currentNode);

        expect(this.lastNode.previousNode).toBe(this.currentNode);
        expect(this.lastNode.nextNode).toBeUndefined();

        expect(this.nextNode.previousNode).toBe(this.previousNode);
        expect(this.nextNode.nextNode).toBeUndefined();

        expect(this.previousNode.previousNode).toBeUndefined();
        expect(this.previousNode.nextNode).toBe(this.nextNode);
    }


    @Case()
    public 'unlink() deletes references'() {
        this.previousNode.link(this.firstNode, this.currentNode);
        this.currentNode.link(this.previousNode, this.nextNode);
        this.nextNode.link(this.currentNode, this.lastNode);

        expect(this.currentNode.previousNode).toBe(this.previousNode);
        expect(this.currentNode.nextNode).toBe(this.nextNode);

        this.currentNode.unlink();

        expect(this.currentNode.previousNode).toBeUndefined();
        expect(this.currentNode.nextNode).toBeUndefined();

        expect(this.previousNode.previousNode).toBe(this.firstNode);
        expect(this.previousNode.nextNode).toBe(this.nextNode);

        expect(this.nextNode.previousNode).toBe(this.previousNode);
        expect(this.nextNode.nextNode).toBe(this.lastNode);
    }
}
