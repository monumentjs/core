import { EmptyStackException } from '@monument/exceptions';
import { Sequence, Stack } from '../../../../index';
import { testReadOnlyStack } from '../readonly/ReadOnlyStack.spec';

export function testStack(create: <I>(items?: Sequence<I>) => Stack<I>) {
  describe('Stack', function() {
    testReadOnlyStack(create);

    describe('push()', function() {
      it('should add item to the stack', function() {
        const stack: Stack<string> = create();

        expect(stack.push('a')).toBe(true);
        expect(stack.length).toBe(1);
        expect(stack.push('b')).toBe(true);
        expect(stack.length).toBe(2);
        expect(stack.push('c')).toBe(true);
        expect(stack.length).toBe(3);
        expect(stack.toArray()).toEqual(['a', 'b', 'c']);
      });
    });

    describe('pop()', function() {
      it('should throw EmptyStackException if stack is empty', function() {
        const stack: Stack<string> = create();

        expect(() => {
          stack.pop();
        }).toThrow(EmptyStackException);
      });

      it('should return next element and removes it from stack', function() {
        const stack: Stack<string> = create(['a', 'b', 'c']);

        expect(stack.pop()).toBe('c');
        expect(stack.length).toBe(2);

        expect(stack.pop()).toBe('b');
        expect(stack.length).toBe(1);

        expect(stack.pop()).toBe('a');
        expect(stack.length).toBe(0);
      });
    });

    describe('peek()', function() {
      it('should throw EmptyStackException is stack is empty', function() {
        const stack: Stack<string> = create();

        expect(() => {
          stack.peek();
        }).toThrow(EmptyStackException);
      });

      it('should return next element of stack', function() {
        const stack: Stack<string> = create(['a', 'b', 'c']);

        expect(stack.peek()).toBe('c');
        expect(stack.length).toBe(3);

        expect(stack.peek()).toBe('c');
        expect(stack.length).toBe(3);
      });
    });
  });
}
