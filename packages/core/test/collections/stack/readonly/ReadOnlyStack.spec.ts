import {EmptyStackException, ReadOnlyStack, Sequence} from '../../../..';
import {testQueryable} from '../../base/Queryable.spec';

export function testReadOnlyStack(create: <I>(items?: Sequence<I>) => ReadOnlyStack<I>) {
    describe('ReadOnlyStack', function () {
        testQueryable(create);

        describe('peek()', function () {
            it('should throw EmptyStackException if no elements in stack', function () {
                const queue = create();

                expect(() => {
                    queue.peek();
                }).toThrow(EmptyStackException);
            });

            it('should return head element of stack', function () {
                const queue = create(['a', 'b']);

                expect(queue.peek()).toBe('b');
            });
        });
    });
}
