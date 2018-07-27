import {CollectionSpec} from './CollectionSpec';
import {Stack} from '@monument/core/main/collection/mutable/Stack';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {EmptyStackException} from '@monument/core/main/collection/EmptyStackException';


export abstract class StackSpec extends CollectionSpec {
    public abstract create<T>(items?: Iterable<T>): Stack<T>;


    @Test
    public 'push() adds item to the end of stack'(assert: Assert) {
        const stack: Stack<string> = this.create();

        assert.true(stack.push('a'));
        assert.equals(stack.length, 1);
        assert.true(stack.push('b'));
        assert.equals(stack.length, 2);
        assert.true(stack.push('c'));
        assert.equals(stack.length, 3);
        assert.identical(stack.toArray(), ['a', 'b', 'c']);
    }


    @Test
    public 'pop() throws EmptyStackException if stack is empty'(assert: Assert) {
        const stack: Stack<string> = this.create();

        assert.throws(() => {
            stack.pop();
        }, EmptyStackException);
    }


    @Test
    public 'pop() returns next element and removes it from stack'(assert: Assert) {
        const stack: Stack<string> = this.create(['a', 'b', 'c']);

        assert.equals(stack.pop(), 'c');
        assert.equals(stack.length, 2);

        assert.equals(stack.pop(), 'b');
        assert.equals(stack.length, 1);

        assert.equals(stack.pop(), 'a');
        assert.equals(stack.length, 0);
    }


    @Test
    public 'pick() throws EmptyStackException is stack is empty'(assert: Assert) {
        const stack: Stack<string> = this.create();

        assert.throws(() => {
            stack.peek();
        }, EmptyStackException);
    }


    @Test
    public 'pick() returns next element of stack'(assert: Assert) {
        const stack: Stack<string> = this.create(['a', 'b', 'c']);

        assert.equals(stack.peek(), 'c');
        assert.equals(stack.length, 3);

        assert.equals(stack.peek(), 'c');
        assert.equals(stack.length, 3);
    }
}
