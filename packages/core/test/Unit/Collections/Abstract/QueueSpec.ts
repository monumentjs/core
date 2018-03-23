import {EmptyQueueException} from '../../../../../collections-core/main/EmptyQueueException';
import {Queue} from '../../../../../collections-core/main/Queue';
import {CollectionSpec} from './CollectionSpec';
import {BeforeEach} from '@monument/test-drive/Decorators/BeforeEach';
import {Case} from '../../../../../test-drive/Decorators/Case';


export abstract class QueueSpec extends CollectionSpec {
    protected queue: Queue<string>;


    public abstract create<T>(items?: Iterable<T>): Queue<T>;


    @BeforeEach()
    public setUpTest() {
        this.queue = this.create();
    }


    public 'add() adds item into collection'() {
        // Disable check
    }


    @Case()
    public 'add() adds item to the begin of queue'() {
        this.queue.add('a');

        expect(this.queue.length).toBe(1);

        this.queue.add('b');

        expect(this.queue.length).toBe(2);

        this.queue.add('c');

        expect(this.queue.length).toBe(3);

        expect(this.queue.toArray()).toEqual(['c', 'b', 'a']);
    }


    @Case()
    public 'pop() throws EmptyQueueException if queue is empty'() {
        expect(() => {
            this.queue.pop();
        }).toThrowError(EmptyQueueException);
    }


    @Case()
    public 'pop() returns next element and removes it from queue'() {
        this.queue.add('a');
        this.queue.add('b');
        this.queue.add('c');

        expect(this.queue.pop()).toBe('a');
        expect(this.queue.length).toBe(2);
        expect(this.queue.pop()).toBe('b');
        expect(this.queue.length).toBe(1);
        expect(this.queue.pop()).toBe('c');
        expect(this.queue.length).toBe(0);
    }


    @Case()
    public 'pick() throws if queue is empty'() {
        expect(() => {
            this.queue.peek();
        }).toThrowError(EmptyQueueException);
    }


    @Case()
    public 'pick() returns next element of queue'() {
        this.queue = this.create(['a', 'b', 'c']);

        expect(this.queue.peek()).toBe('a');
        expect(this.queue.length).toBe(3);

        expect(this.queue.peek()).toBe('a');
        expect(this.queue.length).toBe(3);
    }
}
