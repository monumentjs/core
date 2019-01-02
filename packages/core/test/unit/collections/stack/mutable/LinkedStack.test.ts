import {testStack} from './Stack.spec';
import {LinkedStack, Sequence} from '../../../../..';

describe('ListStack', function () {
    function create<I>(items?: Sequence<I>): LinkedStack<I> {
        return new LinkedStack(items);
    }

    testStack(create);

    it('equals() compares empty stacks', function () {
        const list: LinkedStack<string> = create();

        expect(list.equals(create())).toBe(true);
    });

    it('equals() compares lists', function () {
        const list: LinkedStack<string> = create(['one', 'two', 'three']);

        expect(list.equals(create(['one', 'two', 'three']))).toBe(true);
        expect(list.equals(create(['ONE', 'TWO']))).toBe(false);
        expect(list.equals(create(['ONE', 'TWO', 'THREE']))).toBe(false);
    });

    it('toJSON() returns pure JS array for JSON serialization', function () {
        const list: LinkedStack<string> = create(['one', 'two', 'three']);

        expect(list.toJSON() instanceof Array).toBe(true);
        expect(list.toJSON()).toEqual(['one', 'two', 'three']);
    });

    it('toArray() returns pure JS array', function () {
        const list: LinkedStack<string> = create(['one', 'two', 'three']);

        expect(list.toArray() instanceof Array).toBe(true);
        expect(list.toArray()).toEqual(['one', 'two', 'three']);
    });
});
