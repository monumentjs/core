import {TestTask} from './Mocks/TestTask';
import {Exception} from '../../../Source/Exceptions/Exception';


describe('Task', () => {

    describe('start()', () => {
        it('complete task with result', async () => {
            let onComplete = jest.fn();
            let onError = jest.fn();
            let task: TestTask<string> = new TestTask('OK');

            task.onComplete.subscribe(onComplete);
            task.onError.subscribe(onError);

            await task.start();

            expect(onComplete).toHaveBeenCalledTimes(1);
            expect(onError).toHaveBeenCalledTimes(0);
            expect(task.result).toEqual('OK');
            expect(task.error).toEqual(undefined);
            expect(task.isComplete).toEqual(true);
            expect(task.isResolved).toEqual(true);
            expect(task.isRejected).toEqual(false);
        });


        it('fail task with error', async () => {
            let error: Exception = new Exception('Fake error');
            let onComplete = jest.fn();
            let onError = jest.fn();
            let task: TestTask<string> = new TestTask(undefined, error) as any;

            task.onComplete.subscribe(onComplete);
            task.onError.subscribe(onError);

            await task.start();

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
