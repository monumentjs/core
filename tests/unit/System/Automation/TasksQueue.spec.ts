import FakeTask from '../../../mocks/TestTask';
import TasksQueue from '../../../../lib/System/Automation/TaskScheduler';


describe('TasksQueue', () => {
    describe('#constructor(options)', () => {
        it('can be called without arguments', () => {
            let tasksQueue: TasksQueue = null;

            expect(function () {
                tasksQueue = new TasksQueue();
            }).not.toThrow();
        });


        it('can be called with arguments', () => {
            let tasksQueue: TasksQueue = null;

            expect(function () {
                tasksQueue = new TasksQueue(10);
            }).not.toThrow();

            expect(tasksQueue).toBeInstanceOf(TasksQueue);
        });
    });


    describe.skip('#enqueue()', () => {
        it('add task to the end of queue', (next) => {
            let tasksQueue: TasksQueue = new TasksQueue(1);
            let task: FakeTask<string> = new FakeTask<string>('OK');
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

            tasksQueue.enqueueTask(task);

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