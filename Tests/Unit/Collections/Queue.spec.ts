import {Queue} from '../../../Source/Collections/Queue';
import {InvalidOperationException} from '../../../Source/Exceptions/InvalidOperationException';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';


describe(`Queue`, () => {
    let instance: Queue<string>;


    beforeEach(() => {
        expect(() => {
            instance = new Queue<string>();
        }).not.toThrow();
    });


    describe('#constructor()', () => {
        it(`creates new empty instance of Queue class`, () => {
            expect(instance).toBeInstanceOf(Queue);
            expect(instance.length).toBe(0);
        });

        it(`creates new instance of Queue class from existing list`, () => {
            instance = new Queue(['a', 'b', 'c']);

            expect(instance.length).toBe(3);
            expect(instance[0]).toBe('a');
            expect(instance[1]).toBe('b');
            expect(instance[2]).toBe('c');
        });

        it(`throws if existing list is null`, () => {
            expect(() => {
                return new Queue(null);
            }).toThrowError(ArgumentNullException);
        });
    });


    describe(`#enqueue()`, () => {
        it(`adds item to the begin of queue`, () => {
            instance.enqueue('a');

            expect(instance.length).toBe(1);

            instance.enqueue('b');

            expect(instance.length).toBe(2);

            instance.enqueue('c');

            expect(instance.length).toBe(3);

            expect(instance[0]).toBe('c');
            expect(instance[1]).toBe('b');
            expect(instance[2]).toBe('a');
        });
    });


    describe(`#dequeue()`, () => {
        it(`throws if queue is empty`, () => {
            expect(() => {
                instance.dequeue();
            }).toThrowError(InvalidOperationException);
        });

        it(`returns next element and removes it from queue`, () => {
            instance.enqueue('a');
            instance.enqueue('b');
            instance.enqueue('c');

            expect(instance.dequeue()).toBe('a');
            expect(instance.length).toBe(2);
            expect(instance.dequeue()).toBe('b');
            expect(instance.length).toBe(1);
            expect(instance.dequeue()).toBe('c');
            expect(instance.length).toBe(0);
        });
    });


    describe(`#pick()`, () => {
        it(`throws if queue is empty`, () => {
            expect(() => {
                instance.peek();
            }).toThrowError(InvalidOperationException);
        });

        it(`returns next element of queue`, () => {
            instance = new Queue(['a', 'b', 'c']);

            expect(instance.peek()).toBe('a');
            expect(instance.length).toBe(3);

            expect(instance.peek()).toBe('a');
            expect(instance.length).toBe(3);
        });
    });


    describe(`#clear()`, () => {
        it(`clears queue`, () => {
            instance = new Queue(['a', 'b', 'c']);

            expect(instance.length).toBe(3);

            instance.clear();

            expect(instance.length).toBe(0);
        });
    });


    describe(`#contains()`, () => {
        it(`throws if 'comparator' argument is not defined`, () => {
            expect(() => {
                instance.contains('a', null);
            }).toThrowError(ArgumentNullException);
        });

        it(`determines whether queue contains item using default equality comparator`, () => {
            instance = new Queue(['a', 'b', 'c']);

            expect(instance.contains('a')).toBe(true);
            expect(instance.contains('d')).toBe(false);
        });

        it(`determines whether queue contains item using custom equality comparator`, () => {
            instance = new Queue(['a', 'b', 'c']);

            expect(instance.contains('A', IgnoreCaseComparator.instance)).toBe(true);
            expect(instance.contains('D', IgnoreCaseComparator.instance)).toBe(false);
        });
    });
});
