import { Test } from '../../../../test-drive/Decorators/TestConfiguration';
import { Case } from '../../../../test-drive/Decorators/Case';
import { TestTask } from './Mocks/TestTask';
import { Exception } from '../../../core/main/exceptions/Exception';
import { InvalidOperationException } from '../../../core/main/exceptions/InvalidOperationException';


@Test()
export class TaskSpec {

    @Case()
    public async 'start() complete task with result'() {
        let onComplete = jest.fn();
        let onError = jest.fn();
        let task: TestTask<string> = new TestTask('OK');

        task.completed.subscribe(onComplete);
        task.failed.subscribe(onError);

        await task.run();

        expect(onComplete).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledTimes(0);
        expect(task.result).toEqual('OK');
        expect(task.error).toEqual(undefined);
        expect(task.isCompleted).toEqual(true);
        expect(task.isResolved).toEqual(true);
        expect(task.isRejected).toEqual(false);
    }


    @Case()
    public async 'start() fail task with error'() {
        let error: Exception = new InvalidOperationException('Fake error');
        let onComplete = jest.fn();
        let onError = jest.fn();
        let task: TestTask<string> = new TestTask(undefined, error) as any;

        task.completed.subscribe(onComplete);
        task.failed.subscribe(onError);

        await task.run();

        expect(onComplete).toHaveBeenCalledTimes(0);
        expect(onError).toHaveBeenCalledTimes(1);
        expect(task.result).toEqual(undefined);
        expect(task.error).toEqual(error);
        expect(task.isCompleted).toEqual(true);
        expect(task.isResolved).toEqual(false);
        expect(task.isRejected).toEqual(true);
    }
}
