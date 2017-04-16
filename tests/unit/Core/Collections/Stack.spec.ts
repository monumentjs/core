import Stack from '../../../../src/Core/Collections/Stack';
import InvalidOperationException from '../../../../src/Core/Exceptions/InvalidOperationException';
import ArgumentNullException from '../../../../src/Core/Exceptions/ArgumentNullException';
import IgnoreCaseComparator from '../../../../src/Core/Text/IgnoreCaseComparator';


describe(`Stack`, () => {
    let instance: Stack<string>;


    beforeEach(() => {
        expect(() => {
            instance = new Stack<string>();
        }).not.toThrow();
    });


    describe('#constructor()', () => {
        it(`creates new empty instance of Stack class`, () => {
            expect(instance).toBeInstanceOf(Stack);
            expect(instance.length).toBe(0);
        });

        it(`creates new instance of Stack class from existing list`, () => {
            instance = new Stack(['a', 'b', 'c']);

            expect(instance.length).toBe(3);
            expect(instance[0]).toBe('a');
            expect(instance[1]).toBe('b');
            expect(instance[2]).toBe('c');
        });

        it(`throws if existing list is null`, () => {
            expect(() => {
                return new Stack(null);
            }).toThrowError(ArgumentNullException);
        });
    });


    describe(`#push()`, () => {
        it(`adds item to the end of stack`, () => {
            instance.push('a');

            expect(instance.length).toBe(1);

            instance.push('b');

            expect(instance.length).toBe(2);

            instance.push('c');

            expect(instance.length).toBe(3);

            expect(instance[0]).toBe('a');
            expect(instance[1]).toBe('b');
            expect(instance[2]).toBe('c');
        });
    });


    describe(`#pop()`, () => {
        it(`throws if stack is empty`, () => {
            expect(() => {
                instance.pop();
            }).toThrowError(InvalidOperationException);
        });

        it(`returns next element and removes it from stack`, () => {
            instance.push('a');
            instance.push('b');
            instance.push('c');

            expect(instance.pop()).toBe('c');
            expect(instance.length).toBe(2);
            expect(instance.pop()).toBe('b');
            expect(instance.length).toBe(1);
            expect(instance.pop()).toBe('a');
            expect(instance.length).toBe(0);
        });
    });


    describe(`#pick()`, () => {
        it(`throws if stack is empty`, () => {
            expect(() => {
                instance.peek();
            }).toThrowError(InvalidOperationException);
        });

        it(`returns next element of stack`, () => {
            instance = new Stack(['a', 'b', 'c']);

            expect(instance.peek()).toBe('c');
            expect(instance.length).toBe(3);

            expect(instance.peek()).toBe('c');
            expect(instance.length).toBe(3);
        });
    });


    describe(`#clear()`, () => {
        it(`clears stack`, () => {
            instance = new Stack(['a', 'b', 'c']);

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

        it(`determines whether stack contains item using default equality comparator`, () => {
            instance = new Stack(['a', 'b', 'c']);

            expect(instance.contains('a')).toBe(true);
            expect(instance.contains('d')).toBe(false);
        });

        it(`determines whether stack contains item using custom equality comparator`, () => {
            instance = new Stack(['a', 'b', 'c']);

            expect(instance.contains('A', IgnoreCaseComparator.instance)).toBe(true);
            expect(instance.contains('D', IgnoreCaseComparator.instance)).toBe(false);
        });
    });
});