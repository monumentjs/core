import ErrorFactory from '../../Core/helpers/ErrorFactory';
import FakeTask from '../../Core/helpers/FakeTask';
import {Task} from '../../../lib/System/Automation/Task';


describe.skip('class Task', () => {
    describe('#constructor', () => {
        it('create new instance of Task', () => {
            let task: FakeTask<number> = null;

            expect(() => {
                task = new FakeTask<number>(1);
            }).not.toThrow();

            expect(task).toBeInstanceOf(Task);
        });
    });


    describe('#run', () => {
        describe('synchronous task', () => {
            it('complete task with result', () => {
                let onComplete = jest.fn();
                let onError = jest.fn();
                let task: FakeTask<string> = new FakeTask<string>('OK');

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
                let task: FakeTask<string> = new FakeTask<string>(undefined, error);

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
