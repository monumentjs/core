import {Queue} from '../../../Source/Collections/Queue';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';
import {EmptyQueueException} from '../../../Source/Collections/EmptyQueueException';


describe(`Queue`, () => {
    let queue: Queue<string>;


    beforeEach(() => {
        expect(() => {
            queue = new Queue<string>();
        }).not.toThrow();
    });


    describe('constructor()', () => {
        it(`creates new empty instance of Queue class`, () => {
            expect(queue).toBeInstanceOf(Queue);
            expect(queue.length).toBe(0);
        });

        it(`creates new instance of Queue class from existing list`, () => {
            queue = new Queue(['a', 'b', 'c']);

            expect(queue.length).toBe(3);
            expect(queue[0]).toBe('a');
            expect(queue[1]).toBe('b');
            expect(queue[2]).toBe('c');
        });
    });


    describe(`add()`, () => {
        it(`adds item to the begin of queue`, () => {
            queue.add('a');

            expect(queue.length).toBe(1);

            queue.add('b');

            expect(queue.length).toBe(2);

            queue.add('c');

            expect(queue.length).toBe(3);

            expect(queue[0]).toBe('c');
            expect(queue[1]).toBe('b');
            expect(queue[2]).toBe('a');
        });
    });


    describe(`pop()`, () => {
        it(`throws if queue is empty`, () => {
            expect(() => {
                queue.pop();
            }).toThrowError(EmptyQueueException);
        });

        it(`returns next element and removes it from queue`, () => {
            queue.add('a');
            queue.add('b');
            queue.add('c');

            expect(queue.pop()).toBe('a');
            expect(queue.length).toBe(2);
            expect(queue.pop()).toBe('b');
            expect(queue.length).toBe(1);
            expect(queue.pop()).toBe('c');
            expect(queue.length).toBe(0);
        });
    });


    describe(`pick()`, () => {
        it(`throws if queue is empty`, () => {
            expect(() => {
                queue.peek();
            }).toThrowError(EmptyQueueException);
        });

        it(`returns next element of queue`, () => {
            queue = new Queue(['a', 'b', 'c']);

            expect(queue.peek()).toBe('a');
            expect(queue.length).toBe(3);

            expect(queue.peek()).toBe('a');
            expect(queue.length).toBe(3);
        });
    });


    describe(`clear()`, () => {
        it(`clears queue`, () => {
            queue = new Queue(['a', 'b', 'c']);

            expect(queue.length).toBe(3);

            queue.clear();

            expect(queue.length).toBe(0);
        });
    });


    describe(`contains()`, () => {
        it(`determines whether queue contains item using default equality comparator`, () => {
            queue = new Queue(['a', 'b', 'c']);

            expect(queue.contains('a')).toBe(true);
            expect(queue.contains('d')).toBe(false);
        });

        it(`determines whether queue contains item using custom equality comparator`, () => {
            queue = new Queue(['a', 'b', 'c']);

            expect(queue.contains('A', IgnoreCaseComparator.instance)).toBe(true);
            expect(queue.contains('D', IgnoreCaseComparator.instance)).toBe(false);
        });
    });
});
