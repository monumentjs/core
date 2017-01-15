import FakeTask from '../../Core/helpers/FakeTask';
import TasksQueue from '../../../lib/System/Automation/TasksQueue';


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


    describe('#enqueue()', () => {
        it('should add task to the end of queue', () => {
            let tasksQueue: TasksQueue = new TasksQueue(1);
            let task: FakeTask<string> = new FakeTask<string>('OK');
            let onTaskComplete = jest.fn();
            let onTaskError = jest.fn();

            task.once('complete', onTaskComplete);
            task.once('error', onTaskError);

            expect(task.isResolved).toBe(false);
            expect(task.isRejected).toBe(false);
            expect(task.isPending).toBe(false);
            expect(task.isComplete).toBe(false);
            expect(task.result).toBe(undefined);
            expect(task.error).toBe(undefined);

            tasksQueue.enqueue(task);

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