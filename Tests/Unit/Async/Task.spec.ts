import {TestTask} from './_Mocks/TestTask';
import {Task} from '../../../Source/Async/Task';


describe.skip('class Task', () => {
    describe('#constructor', () => {
        it('create new instance of Task', () => {
            let task: TestTask<number> | null = null;

            expect(() => {
                task = new TestTask<number>(1);
            }).not.toThrow();

            expect(task).toBeInstanceOf(Task);
        });
    });


    describe('#run', () => {
        describe('synchronous task', () => {
            it('complete task with result', () => {
                let onComplete = jest.fn();
                let onError = jest.fn();
                let task: TestTask<string> = new TestTask('OK');

                task.addEventListener('complete', onComplete);
                task.addEventListener('error', onError);
                task.start();

                expect(onComplete).toHaveBeenCalledTimes(1);
                expect(onError).toHaveBeenCalledTimes(0);
                expect(task.result).toEqual('OK');
                expect(task.error).toEqual(undefined);
                expect(task.isComplete).toEqual(true);
                expect(task.isResolved).toEqual(true);
                expect(task.isRejected).toEqual(false);
            });


            it('fail task with error', () => {
                let error: Error = new Error('Fake error');
                let onComplete = jest.fn();
                let onError = jest.fn();
                let task: TestTask<string> = new TestTask(undefined, error) as any;

                task.addEventListener('complete', onComplete);
                task.addEventListener('error', onError);
                task.start();

                expect(onComplete).toHaveBeenCalledTimes(0);
                expect(onError).toHaveBeenCalledTimes(1);
                expect(task.result).toEqual(undefined);
                expect(task.error).toEqual(error);
                expect(task.isComplete).toEqual(true);
                expect(task.isResolved).toEqual(false);
                expect(task.isRejected).toEqual(true);
            });
        });
    });
});
