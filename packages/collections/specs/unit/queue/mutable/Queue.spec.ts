import {
  EmptyQueueException,
  Sequence,
  Queue
} from '../../../../index';
import { testReadOnlyQueue } from '../readonly/ReadOnlyQueue.spec';

export function testQueue(create: <I>(items?: Sequence<I>) => Queue<I>) {
  describe('Queue', function() {
    testReadOnlyQueue(create);

    describe('enqueue()', function() {
      it('should add item to the queue', function() {
        const queue = create();

        queue.enqueue('a');

        expect(queue.length).toBe(1);

        queue.enqueue('b');

        expect(queue.length).toBe(2);

        queue.enqueue('c');

        expect(queue.length).toBe(3);

        expect(queue.toArray()).toEqual(['a', 'b', 'c']);
      });
    });

    describe('dequeue()', function() {
      it('should throw EmptyQueueException if queue is empty', function() {
        const queue = create();

        expect(() => {
          queue.dequeue();
        }).toThrow(EmptyQueueException);
      });

      it('should return next element and removes it from queue', function() {
        const queue = create();

        queue.enqueue('a');
        queue.enqueue('b');
        queue.enqueue('c');

        expect(queue.dequeue()).toBe('a');
        expect(queue.length).toBe(2);
        expect(queue.toArray()).toEqual(['b', 'c']);

        expect(queue.dequeue()).toBe('b');
        expect(queue.length).toBe(1);
        expect(queue.toArray()).toEqual(['c']);

        expect(queue.dequeue()).toBe('c');
        expect(queue.length).toBe(0);
        expect(queue.toArray()).toEqual([]);
      });
    });
  });
}
