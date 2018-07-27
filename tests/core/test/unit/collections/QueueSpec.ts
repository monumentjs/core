import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Queue} from '@monument/core/main/collection/mutable/Queue';
import {EmptyQueueException} from '@monument/core/main/collection/EmptyQueueException';
import {CollectionSpec} from './CollectionSpec';


export abstract class QueueSpec extends CollectionSpec {
    protected queue!: Queue<string>;


    public abstract create<T>(items?: Iterable<T>): Queue<T>;


    @BeforeEach
    public setup() {
        this.queue = this.create();
    }


    public 'add() adds item into collection'() {
        // Disable check
    }


    @Test
    public 'add() adds item to the begin of queue'(assert: Assert) {
        this.queue.add('a');

        assert.equals(this.queue.length, 1);

        this.queue.add('b');

        assert.equals(this.queue.length, 2);

        this.queue.add('c');

        assert.equals(this.queue.length, 3);

        assert.identical(this.queue.toArray(), ['c', 'b', 'a']);
    }


    @Test
    public 'pop() throws EmptyQueueException if queue is empty'(assert: Assert) {
        assert.throws(() => {
            this.queue.pop();
        }, EmptyQueueException);
    }


    @Test
    public 'pop() returns next element and removes it from queue'(assert: Assert) {
        this.queue.add('a');
        this.queue.add('b');
        this.queue.add('c');

        assert.equals(this.queue.pop(), 'a');
        assert.equals(this.queue.length, 2);
        assert.equals(this.queue.pop(), 'b');
        assert.equals(this.queue.length, 1);
        assert.equals(this.queue.pop(), 'c');
        assert.equals(this.queue.length, 0);
    }


    @Test
    public 'pick() throws if queue is empty'(assert: Assert) {
        assert.throws(() => {
            this.queue.peek();
        }, EmptyQueueException);
    }


    @Test
    public 'pick() returns next element of queue'(assert: Assert) {
        this.queue = this.create(['a', 'b', 'c']);

        assert.equals(this.queue.peek(), 'a');
        assert.equals(this.queue.length, 3);

        assert.equals(this.queue.peek(), 'a');
        assert.equals(this.queue.length, 3);
    }
}
