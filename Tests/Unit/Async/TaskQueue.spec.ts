import {TestTask} from './_Mocks/TestTask';
import {TaskQueue} from '../../../Source/Async/TaskQueue';


describe('TaskQueue', () => {
    let scheduler: TaskQueue;


    beforeEach(() => {
        scheduler = new TaskQueue();
    });


    describe('#constructor(options)', () => {
        it(`creates new single-threaded scheduler`, () => {
            expect(scheduler).toBeInstanceOf(TaskQueue);
            expect(scheduler.concurrentTasksLimit).toBe(1);
            expect(scheduler.isEmpty).toBe(true);
            expect(scheduler.isIdle).toBe(true);
            expect(scheduler.isBusy).toBe(false);
            expect(scheduler.isDisposed).toBe(false);
        });


        it(`creates new multi-threaded scheduler`, () => {
            scheduler = new TaskQueue(10);

            expect(scheduler).toBeInstanceOf(TaskQueue);
            expect(scheduler.concurrentTasksLimit).toBe(10);
            expect(scheduler.isEmpty).toBe(true);
            expect(scheduler.isIdle).toBe(true);
            expect(scheduler.isBusy).toBe(false);
            expect(scheduler.isDisposed).toBe(false);
        });
    });


    describe('#addTask()', () => {
        it('adds task to the end of queue', () => {
            let taskQueue: TaskQueue = new TaskQueue(1);
            let task: TestTask<string> = new TestTask<string>('OK');
            let onTaskComplete = jest.fn();
            let onTaskError = jest.fn();

            task.addEventListener('complete', onTaskComplete, true);
            task.addEventListener('error', onTaskError, true);

            expect(task.isResolved).toBe(false);
            expect(task.isRejected).toBe(false);
            expect(task.isPending).toBe(false);
            expect(task.isComplete).toBe(false);
            expect(task.result).toBe(undefined);
            expect(task.error).toBe(undefined);

            taskQueue.addTask(task);

            expect(task.isResolved).toBe(true);
            expect(task.isRejected).toBe(false);
            expect(task.isPending).toBe(false);
            expect(task.isComplete).toBe(true);
            expect(task.result).toBe('OK');
            expect(task.error).toBe(undefined);

            expect(onTaskComplete).toHaveBeenCalledTimes(1);
            expect(onTaskError).toHaveBeenCalledTimes(0);
        });
    });
});
