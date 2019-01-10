import {testStack} from './Stack.spec';
import {ArrayStack} from '../../../../..';

describe('ArrayStack', function () {
    function create<I>(items: Iterable<I> = []): ArrayStack<I> {
        return new ArrayStack(items);
    }

    testStack(create);

    it('equals() compares empty stacks', function () {
        const list: ArrayStack<string> = create();

        expect(list.equals(create())).toBe(true);
    });

    it('equals() compares lists', function () {
        const list: ArrayStack<string> = create(['one', 'two', 'three']);

        expect(list.equals(create(['one', 'two', 'three']))).toBe(true);
        expect(list.equals(create(['ONE', 'TWO']))).toBe(false);
        expect(list.equals(create(['ONE', 'TWO', 'THREE']))).toBe(false);
    });

    it('toJSON() returns pure JS array for JSON serialization', function () {
        const list: ArrayStack<string> = create(['one', 'two', 'three']);

        expect(list.toJSON() instanceof Array).toBe(true);
        expect(list.toJSON()).toEqual(['one', 'two', 'three']);
    });

    it('toArray() returns pure JS array', function () {
        const list: ArrayStack<string> = create(['one', 'two', 'three']);

        expect(list.toArray() instanceof Array).toBe(true);
        expect(list.toArray()).toEqual(['one', 'two', 'three']);
    });
});
