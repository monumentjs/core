import ErrorFactory from './helpers/ErrorFactory';
import FakeTask from './helpers/FakeTask';
import Task from '../../lib/System/Automation/Job';


describe('Core.Task', () => {
    describe('#constructor', () => {
        it('should create new instance of Task', () => {
            let task: FakeTask<number, any> = null;

            expect(function () {
                task = new FakeTask<number, any>({
                    result: 1
                });
            }).not.toThrow();

            expect(task).toBeInstanceOf(Task);
            expect(typeof task.id).toBe('undefined');
            expect(typeof task.name).toBe('undefined');
            expect(typeof task.description).toBe('string');
        });
    });


    describe('#run', () => {
        it('should complete task with result', () => {
            let task = new FakeTask({
                result: 'OK'
            });

            return task.run().then((result) => {
                expect(result).toEqual('OK');
            });
        });


        it('should call only success callback in case of task complete without error', () => {
            let task: FakeTask<string, any> = new FakeTask<string, any>({
                result: 'OK'
            });

            let onSuccess = jest.fn();
            let onError = jest.fn();

            return task.run().then(onSuccess, onError).then(() => {
                expect(onSuccess).toHaveBeenCalledTimes(1);
                expect(onSuccess).toHaveBeenCalledWith('OK');
                expect(onError).toHaveBeenCalledTimes(0);
            });
        });


        it('should fail task with error', () => {
            let taskError: Error = ErrorFactory.createSimpleError();
            let task: FakeTask<any, Error> = new FakeTask<any, Error>({
                error: taskError
            });

            return task.run().then(null, (error: Error) => {
                expect(error).toBeInstanceOf(Error);
                expect(error).toEqual(taskError);
            });
        });


        it('should call only fail callback in case of task complete with error', () => {
            let taskError: Error = ErrorFactory.createSimpleError();
            let task: FakeTask<any, Error> = new FakeTask<any, Error>({
                error: taskError
            });

            let onSuccess = jest.fn();
            let onError = jest.fn();

            return task.run().then(onSuccess, onError).then(() => {
                expect(onError).toHaveBeenCalledTimes(1);
                expect(onError).toHaveBeenCalledWith(taskError);
                expect(onSuccess).toHaveBeenCalledTimes(0);
            });
        });
    });
});