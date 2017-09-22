import {LinkedListNode} from '../../../Source/Collections/LinkedListNode';


describe(`LinkedListNode`, () => {
    const FIRST_VALUE = 'First';
    const PREVIOUS_VALUE = 'Previous';
    const CURRENT_VALUE = 'Current';
    const NEXT_VALUE = 'Next';
    const LAST_VALUE = 'Last';

    let first: LinkedListNode<string>;
    let previous: LinkedListNode<string>;
    let current: LinkedListNode<string>;
    let next: LinkedListNode<string>;
    let last: LinkedListNode<string>;


    beforeEach(() => {
        first = new LinkedListNode(FIRST_VALUE);
        previous = new LinkedListNode(PREVIOUS_VALUE);
        current = new LinkedListNode(CURRENT_VALUE);
        next = new LinkedListNode(NEXT_VALUE);
        last = new LinkedListNode(LAST_VALUE);
    });
    

    describe(`link()`, () => {
        it(`links node with both defined neighbours`, () => {
            previous.link(first, current);
            current.link(previous, next);
            next.link(current, last);

            expect(first.previous).toBeUndefined();
            expect(first.next).toBe(previous);

            expect(previous.previous).toBe(first);
            expect(previous.next).toBe(current);

            expect(current.previous).toBe(previous);
            expect(current.next).toBe(next);

            expect(next.previous).toBe(current);
            expect(next.next).toBe(last);

            expect(last.previous).toBe(next);
            expect(last.next).toBeUndefined();
        });


        it(`detaches node from previous neighbors`, () => {
            current.link(previous, next);

            expect(current.previous).toBe(previous);
            expect(current.next).toBe(next);

            current.link(first, last);

            expect(current.previous).toBe(first);
            expect(current.next).toBe(last);

            expect(first.previous).toBeUndefined();
            expect(first.next).toBe(current);

            expect(last.previous).toBe(current);
            expect(last.next).toBeUndefined();

            expect(next.previous).toBeUndefined();
            expect(next.next).toBeUndefined();

            expect(previous.previous).toBeUndefined();
            expect(previous.next).toBeUndefined();

        });
    });


    describe(`unlink()`, () => {
        it(`deletes references`, () => {
            previous.link(first, current);
            current.link(previous, next);
            next.link(current, last);

            expect(current.previous).toBe(previous);
            expect(current.next).toBe(next);

            current.unlink();

            expect(current.previous).toBeUndefined();
            expect(current.next).toBeUndefined();

            expect(previous.previous).toBe(first);
            expect(previous.next).toBe(next);

            expect(next.previous).toBe(previous);
            expect(next.next).toBe(last);

        });
    });
});
