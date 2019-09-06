import { EmptyStackException } from '../../../../src/stack/EmptyStackException';
import { ReadOnlyStack } from '../../../../src/stack/readonly/ReadOnlyStack';
import { Sequence } from '../../../../src/base/Sequence';
import { testReadOnlyCollection } from '../../collection/readonly/ReadOnlyCollection.spec';

export function testReadOnlyStack(create: <I>(items?: Sequence<I>) => ReadOnlyStack<I>) {
  describe('ReadOnlyStack', function() {
    testReadOnlyCollection(create);

    describe('peek()', function() {
      it('should throw EmptyStackException if no elements in stack', function() {
        const queue = create();

        expect(() => {
          queue.peek();
        }).toThrow(EmptyStackException);
      });

      it('should return head element of stack', function() {
        const queue = create(['a', 'b']);

        expect(queue.peek()).toBe('b');
      });
    });
  });
}
