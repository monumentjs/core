import { TaskQueue } from '../../main/TaskQueue';
import { BeforeEach } from '@monument/test-drive/Decorators/BeforeEach';
import { TestTask } from './Mocks/TestTask';
import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { Case } from '../../../../test-drive/Decorators/Case';


@Test()
export class TaskQueueSpec {
    private scheduler: TaskQueue;


    @BeforeEach()
    public setUpTest() {
        this.scheduler = new TaskQueue();
    }


    @Case()
    public 'constructor() creates new single-threaded scheduler'() {
        expect(this.scheduler).toBeInstanceOf(TaskQueue);
        expect(this.scheduler.concurrency).toBe(1);
        expect(this.scheduler.isEmpty).toBe(true);
        expect(this.scheduler.isIdle).toBe(true);
        expect(this.scheduler.isBusy).toBe(false);
    }


    @Case()
    public 'constructor() creates new multi-threaded scheduler'() {
        this.scheduler = new TaskQueue(10);

        expect(this.scheduler).toBeInstanceOf(TaskQueue);
        expect(this.scheduler.concurrency).toBe(10);
        expect(this.scheduler.isIdle).toBe(true);
        expect(this.scheduler.isEmpty).toBe(true);
        expect(this.scheduler.isBusy).toBe(false);
    }


    @Case()
    public async 'enqueue() adds task to the start of queue'() {

        let taskQueue: TaskQueue = new TaskQueue(1);
        let task: TestTask<string> = new TestTask<string>('OK');
        let onTaskComplete = jest.fn();
        let onTaskError = jest.fn();

        await new Promise((resolve) => {
            task.completed.subscribe(onTaskComplete);
            task.failed.subscribe(onTaskError);

            expect(task.isResolved).toBe(false);
            expect(task.isRejected).toBe(false);
            expect(task.isRunning).toBe(false);
            expect(task.isCompleted).toBe(false);
            expect(task.result).toBe(undefined);
            expect(task.error).toBe(undefined);

            expect(taskQueue.enqueue(task)).toBe(true);

            expect(task.isResolved).toBe(false);
            expect(task.isRejected).toBe(false);
            expect(task.isRunning).toBe(true);
            expect(task.isCompleted).toBe(false);
            expect(task.result).toBe(undefined);
            expect(task.error).toBe(undefined);

            task.completed.subscribe(resolve);
        });

        expect(task.isResolved).toBe(true);
        expect(task.isRejected).toBe(false);
        expect(task.isRunning).toBe(false);
        expect(task.isCompleted).toBe(true);
        expect(task.result).toBe('OK');
        expect(task.error).toBe(undefined);

        expect(onTaskComplete).toHaveBeenCalledTimes(1);
        expect(onTaskError).toHaveBeenCalledTimes(0);
    }
}
