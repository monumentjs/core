import {LinkedListNode} from '../../../../..';

describe('LinkedListNode', function () {
    const FIRST_VALUE = 'First';
    const PREVIOUS_VALUE = 'Previous';
    const CURRENT_VALUE = 'Current';
    const NEXT_VALUE = 'Next';
    const LAST_VALUE = 'Last';

    let firstNode!: LinkedListNode<string>;
    let previousNode!: LinkedListNode<string>;
    let currentNode!: LinkedListNode<string>;
    let nextNode!: LinkedListNode<string>;
    let lastNode!: LinkedListNode<string>;

    beforeEach(() => {
        firstNode = new LinkedListNode(FIRST_VALUE);
        previousNode = new LinkedListNode(PREVIOUS_VALUE);
        currentNode = new LinkedListNode(CURRENT_VALUE);
        nextNode = new LinkedListNode(NEXT_VALUE);
        lastNode = new LinkedListNode(LAST_VALUE);
    });

    describe('link()', function () {
        it('should link node with both defined neighbours', function () {
            previousNode.link(firstNode, currentNode);
            currentNode.link(previousNode, nextNode);
            nextNode.link(currentNode, lastNode);

            expect(firstNode.previousNode).toBe(undefined);
            expect(firstNode.nextNode).toBe(previousNode);

            expect(previousNode.previousNode).toBe(firstNode);
            expect(previousNode.nextNode).toBe(currentNode);

            expect(currentNode.previousNode).toBe(previousNode);
            expect(currentNode.nextNode).toBe(nextNode);

            expect(nextNode.previousNode).toBe(currentNode);
            expect(nextNode.nextNode).toBe(lastNode);

            expect(lastNode.previousNode).toBe(nextNode);
            expect(lastNode.nextNode).toBe(undefined);
        });

        it('should detach node from previous neighbors', function () {
            currentNode.link(previousNode, nextNode);

            expect(currentNode.previousNode).toBe(previousNode);
            expect(currentNode.nextNode).toBe(nextNode);

            currentNode.link(firstNode, lastNode);

            expect(currentNode.previousNode).toBe(firstNode);
            expect(currentNode.nextNode).toBe(lastNode);

            expect(firstNode.previousNode).toBe(undefined);
            expect(firstNode.nextNode).toBe(currentNode);

            expect(lastNode.previousNode).toBe(currentNode);
            expect(lastNode.nextNode).toBe(undefined);

            expect(nextNode.previousNode).toBe(previousNode);
            expect(nextNode.nextNode).toBe(undefined);

            expect(previousNode.previousNode).toBe(undefined);
            expect(previousNode.nextNode).toBe(nextNode);
        });
    });

    describe('unlink()', function () {
        it('should delete references', function () {
            previousNode.link(firstNode, currentNode);
            currentNode.link(previousNode, nextNode);
            nextNode.link(currentNode, lastNode);

            expect(currentNode.previousNode).toBe(previousNode);
            expect(currentNode.nextNode).toBe(nextNode);

            currentNode.unlink();

            expect(currentNode.previousNode).toBe(undefined);
            expect(currentNode.nextNode).toBe(undefined);

            expect(previousNode.previousNode).toBe(firstNode);
            expect(previousNode.nextNode).toBe(nextNode);

            expect(nextNode.previousNode).toBe(previousNode);
            expect(nextNode.nextNode).toBe(lastNode);
        });
    });

    describe('toJSON()', function () {
        it('should return value stored in this node', function () {
            expect(previousNode.toJSON()).toBe(previousNode.nodeValue);
            expect(currentNode.toJSON()).toBe(currentNode.nodeValue);
            expect(nextNode.toJSON()).toBe(nextNode.nodeValue);
        });
    });
});
