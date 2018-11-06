import {EmptyQueueException, ReadOnlyQueue, Sequence} from '../../../..';
import {testQueryable} from '../../base/Queryable.spec';

export function testReadOnlyQueue(create: <I>(items?: Sequence<I>) => ReadOnlyQueue<I>) {
    describe('ReadOnlyQueue', function () {
        testQueryable(create);

        describe('peek()', function () {
            it('should throw EmptyQueueException if no elements in queue', function () {
                const queue = create();

                expect(() => {
                    queue.peek();
                }).toThrow(EmptyQueueException);
            });

            it('should return head element of queue', function () {
                const queue = create(['a', 'b']);

                expect(queue.peek()).toBe('a');
            });
        });
    });
}
