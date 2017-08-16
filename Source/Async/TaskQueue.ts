import {Task} from './Task';
import {IDisposable} from '../types';
import {Queue} from '../Collections/Queue';
import {TaskEvent} from './TaskEvent';
import {Assert} from '../Assertion/Assert';
import {Bind} from '../Language/Decorators/Bind';


export class TaskQueue implements IDisposable {
    public static readonly MIN_CONCURRENCY: number = 1;
    public static readonly DEFAULT_CONCURRENCY: number = 1;


    private _tasksQueue: Queue<Task<any>> = new Queue<Task<any>>();
    private _isDisposed: boolean = false;
    private _concurrency: number;
    private _runningTasksCount: number = 0;


    public get concurrency(): number {
        return this._concurrency;
    }


    public get isBusy(): boolean {
        return this._runningTasksCount > 0;
    }


    public get isIdle(): boolean {
        return this._runningTasksCount === 0;
    }


    public get isEmpty(): boolean {
        return this._tasksQueue.length === 0;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    protected get canRunOneMoreTask(): boolean {
        return !this.isDisposed && !this.isEmpty && this._runningTasksCount < this.concurrency;
    }


    public constructor(concurrency: number = TaskQueue.DEFAULT_CONCURRENCY) {
        Assert.argument('concurrency', concurrency).notNull().bounds(TaskQueue.MIN_CONCURRENCY, Infinity);

        this._concurrency = concurrency;
    }


    public addTask(task: Task<any>): void {
        Assert.argument('task', task).notNull();

        task.addEventListener(TaskEvent.COMPLETE, this.tryRunNextTask, true);
        task.addEventListener(TaskEvent.ERROR, this.tryRunNextTask, true);
        task.addEventListener(TaskEvent.ABORT, this.tryRunNextTask, true);

        this._tasksQueue.enqueue(task);

        this.tryRunNextTask();
    }


    public dispose(): void {
        this._isDisposed = true;

        for (let task of this._tasksQueue) {
            task.abort();
        }

        this._tasksQueue.clear();
    }

    
    @Bind()
    protected tryRunNextTask(): void {
        if (this.canRunOneMoreTask) {
            let task: Task = this._tasksQueue.dequeue();

            task.start();
        }
    }
}
