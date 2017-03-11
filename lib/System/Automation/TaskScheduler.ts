import {Task} from './Task';
import {IDisposable} from '../../Core/types';
import Queue from '../../Core/Collections/Queue';
import TaskEvent from './TaskEvent';


export default class TaskScheduler implements IDisposable {
    private _queue: Queue<Task<any>> = new Queue<Task<any>>();
    private _isDisposed: boolean = false;
    private _concurrentTasksLimit: number;
    private _runningTasksCount: number = 0;


    public get isBusy(): boolean {
        return this._runningTasksCount > 0;
    }


    public get isIdle(): boolean {
        return this._runningTasksCount === 0;
    }


    public get isEmpty(): boolean {
        return this._queue.length === 0;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public constructor(concurrentTasksLimit: number = 1) {
        this._concurrentTasksLimit = concurrentTasksLimit;
    }


    public enqueueTask(task: Task<any>): void {
        task.addEventListener(TaskEvent.COMPLETE, () => {
            this.tryRunNextTask();
        }, true);

        task.addEventListener(TaskEvent.ERROR, () => {
            this.tryRunNextTask();
        }, true);

        task.addEventListener(TaskEvent.ABORT, () => {
            this.tryRunNextTask();
        }, true);

        this._queue.enqueue(task);
        this.tryRunNextTask();
    }


    public dispose(): void {
        this._isDisposed = true;

        for (let task of this._queue) {
            task.abort();
        }

        this._queue.clear();
    }


    protected tryRunNextTask(): void {
        let task: Task<any>;

        if (this._isDisposed || this._runningTasksCount >= this._concurrentTasksLimit) {
            return;
        }

        if (!this.isEmpty) {
            task = this._queue.dequeue();

            task.start();
        }
    }
}