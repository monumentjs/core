import {Assert} from '../assert/Assert';
import {ListQueue} from '../collection/ListQueue';
import {ArrayList} from '../collection/ArrayList';
import {KeyValuePair} from '../collection/KeyValuePair';
import {DeferredObject} from './DeferredObject';
import {Task} from './Task';


export class TaskQueue<TResult> {
    public static readonly MIN_CONCURRENCY: number = 1;

    private readonly _allTasks: ListQueue<KeyValuePair<DeferredObject<void>, Task>> = new ListQueue();
    private readonly _runningTasks: ArrayList<Task> = new ArrayList();
    private readonly _concurrency: number;

    public get concurrency(): number {
        return this._concurrency;
    }


    public get isBusy(): boolean {
        return this._runningTasks.length === this._concurrency;
    }


    public get isIdle(): boolean {
        return this._allTasks.length === 0;
    }


    public constructor(concurrency: number = TaskQueue.MIN_CONCURRENCY) {
        Assert.argument('concurrency', concurrency).bounds(TaskQueue.MIN_CONCURRENCY, Infinity);

        this._concurrency = concurrency;
    }


    public enqueue(task: Task): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._allTasks.enqueue(new KeyValuePair(deferred, task));

        this.tryRunNextTask();

        return deferred.promise;
    }


    private async tryRunNextTask(): Promise<void> {
        if (!this.isBusy) {
            const {key: deferred, value: task} = this._allTasks.pop();

            this._runningTasks.add(task);

            await task.run();

            deferred.resolve();
        }
    }
}
