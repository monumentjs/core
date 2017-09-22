import {Stack} from '../../../Source/Collections/Stack';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';
import {EmptyStackException} from '../../../Source/Collections/EmptyStackException';


describe(`Stack`, () => {
    let stack: Stack<string>;


    beforeEach(() => {
        expect(() => {
            stack = new Stack<string>();
        }).not.toThrow();
    });


    describe('constructor()', () => {
        it(`creates new empty instance of Stack class`, () => {
            expect(stack).toBeInstanceOf(Stack);
            expect(stack.length).toBe(0);
        });

        it(`creates new instance of Stack class from existing list`, () => {
            stack = new Stack(['a', 'b', 'c']);

            expect(stack.length).toBe(3);
            expect(stack[0]).toBe('a');
            expect(stack[1]).toBe('b');
            expect(stack[2]).toBe('c');
        });
    });


    describe(`add()`, () => {
        it(`adds item to the end of stack`, () => {
            stack.add('a');

            expect(stack.length).toBe(1);

            stack.add('b');

            expect(stack.length).toBe(2);

            stack.add('c');

            expect(stack.length).toBe(3);

            expect(stack[0]).toBe('a');
            expect(stack[1]).toBe('b');
            expect(stack[2]).toBe('c');
        });
    });


    describe(`pop()`, () => {
        it(`throws if stack is empty`, () => {
            expect(() => {
                stack.pop();
            }).toThrowError(EmptyStackException);
        });

        it(`returns next element and removes it from stack`, () => {
            stack.addAll(['a', 'b', 'c']);

            expect(stack.pop()).toBe('c');
            expect(stack.length).toBe(2);
            expect(stack.pop()).toBe('b');
            expect(stack.length).toBe(1);
            expect(stack.pop()).toBe('a');
            expect(stack.length).toBe(0);
        });
    });


    describe(`pick()`, () => {
        it(`throws if stack is empty`, () => {
            expect(() => {
                stack.peek();
            }).toThrowError(EmptyStackException);
        });

        it(`returns next element of stack`, () => {
            stack = new Stack(['a', 'b', 'c']);

            expect(stack.peek()).toBe('c');
            expect(stack.length).toBe(3);

            expect(stack.peek()).toBe('c');
            expect(stack.length).toBe(3);
        });
    });


    describe(`clear()`, () => {
        it(`clears stack`, () => {
            stack = new Stack(['a', 'b', 'c']);

            expect(stack.length).toBe(3);

            stack.clear();

            expect(stack.length).toBe(0);
        });
    });


    describe(`contains()`, () => {
        it(`determines whether stack contains item using default equality comparator`, () => {
            stack = new Stack(['a', 'b', 'c']);

            expect(stack.contains('a')).toBe(true);
            expect(stack.contains('d')).toBe(false);
        });

        it(`determines whether stack contains item using custom equality comparator`, () => {
            stack = new Stack(['a', 'b', 'c']);

            expect(stack.contains('A', IgnoreCaseComparator.instance)).toBe(true);
            expect(stack.contains('D', IgnoreCaseComparator.instance)).toBe(false);
        });
    });
});
