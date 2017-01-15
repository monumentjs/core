import {Task} from './Task';
import {IDisposable} from '../../Core/types';
import Queue from '../../Core/Collection/Queue';


export default class TasksQueue implements IDisposable {
    private _queue: Queue<Task<any>> = new Queue<Task<any>>();
    private _isDisposed: boolean = false;
    private _concurrentTasksLimit: number;
    private _runningTasksCount: number = 0;


    get isBusy(): boolean {
        return this._runningTasksCount > 0;
    }


    get isIdle(): boolean {
        return this._runningTasksCount === 0;
    }


    get isEmpty(): boolean {
        return this._queue.length === 0;
    }


    get isDisposed(): boolean {
        return this._isDisposed;
    }

    /**
     * Creates new instance of class.
     *
     * @param concurrentTasksLimit
     */
    constructor(concurrentTasksLimit: number = 1) {
        this._concurrentTasksLimit = concurrentTasksLimit;
    }


    public enqueue(task: Task<any>) {
        task.once('complete', () => {
            this.tryRunNextTask();
        });

        task.once('error', () => {
            this.tryRunNextTask();
        });

        task.once('abort', () => {
            this.tryRunNextTask();
        });

        this._queue.enqueue(task);
        this.tryRunNextTask();
    }


    public dispose() {
        this._isDisposed = true;

        for (let task of this._queue) {
            task.abort();
        }

        this._queue.clear();
    }


    protected tryRunNextTask() {
        let task: Task<any>;

        if (this._isDisposed || this._runningTasksCount >= this._concurrentTasksLimit) {
            return;
        }

        if (!this.isEmpty) {
            task = this._queue.dequeue();
            task.run();
        }
    }
}