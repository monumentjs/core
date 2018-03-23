import { Stack } from '../../../../../collections-core/main/Stack';
import { EmptyStackException } from '../../../../../collections-core/main/EmptyStackException';
import { BeforeEach } from '@monument/test-drive/Decorators/BeforeEach';
import { Case } from '../../../../../test-drive/Decorators/Case';
import { CollectionSpec } from './CollectionSpec';


export abstract class StackSpec extends CollectionSpec {
    private stack: Stack<string>;


    public abstract create<T>(items?: Iterable<T>): Stack<T>;


    @BeforeEach()
    public setUpTest() {
        this.stack = this.create();
    }


    @Case()
    public 'push() adds item to the end of stack'() {
        expect(this.stack.push('a')).toBe(true);

        expect(this.stack.length).toBe(1);

        expect(this.stack.push('b')).toBe(true);

        expect(this.stack.length).toBe(2);

        expect(this.stack.push('c')).toBe(true);

        expect(this.stack.length).toBe(3);

        expect(this.stack.toArray()).toEqual(['a', 'b', 'c']);
    }


    @Case()
    public 'pop() throws EmptyStackException if stack is empty'() {
        expect(() => {
            this.stack.pop();
        }).toThrowError(EmptyStackException);
    }


    @Case()
    public 'pop() returns next element and removes it from stack'() {
        this.stack.addAll(['a', 'b', 'c']);

        expect(this.stack.pop()).toBe('c');
        expect(this.stack.length).toBe(2);

        expect(this.stack.pop()).toBe('b');
        expect(this.stack.length).toBe(1);

        expect(this.stack.pop()).toBe('a');
        expect(this.stack.length).toBe(0);
    }


    @Case()
    public 'pick() throws EmptyStackException is stack is empty'() {
        expect(() => {
            this.stack.peek();
        }).toThrowError(EmptyStackException);
    }


    @Case()
    public 'pick() returns next element of stack'() {
        this.stack = this.create(['a', 'b', 'c']);

        expect(this.stack.peek()).toBe('c');
        expect(this.stack.length).toBe(3);

        expect(this.stack.peek()).toBe('c');
        expect(this.stack.length).toBe(3);
    }
}
