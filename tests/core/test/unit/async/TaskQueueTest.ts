import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {TaskQueue} from '@monument/core/main/async/TaskQueue';
import {TestOperation} from './support/TestOperation';


export class TaskQueueTest {

    @Test
    public 'constructor() creates new single-threaded scheduler'(assert: Assert) {
        const taskQueue: TaskQueue<void> = new TaskQueue();

        assert.equals(taskQueue.concurrency, 1);
        assert.true(taskQueue.isIdle);
        assert.false(taskQueue.isBusy);
    }


    @Test
    public 'constructor() creates new multi-threaded scheduler'(assert: Assert) {
        const taskQueue: TaskQueue<void> = new TaskQueue(10);

        assert.equals(taskQueue.concurrency, 10);
        assert.true(taskQueue.isIdle);
        assert.false(taskQueue.isBusy);
    }


    @Test
    public async 'enqueue() adds task to the start of queue'(assert: Assert) {
        let taskQueue: TaskQueue<string> = new TaskQueue(1);
        let task: TestOperation<string> = new TestOperation<string>('OK');

        assert.false(task.isResolved);
        assert.false(task.isRejected);
        assert.false(task.isRunning);
        assert.false(task.isCompleted);
        assert.equals(task.result, undefined);
        assert.equals(task.error, undefined);

        const promise = taskQueue.enqueue(task);

        assert.false(task.isResolved);
        assert.false(task.isRejected);
        assert.true(task.isRunning);
        assert.false(task.isCompleted);
        assert.equals(task.result, undefined);
        assert.equals(task.error, undefined);

        await promise;

        assert.true(task.isResolved);
        assert.false(task.isRejected);
        assert.false(task.isRunning);
        assert.true(task.isCompleted);
        assert.equals(task.result, 'OK');
        assert.equals(task.error, undefined);
    }
}
