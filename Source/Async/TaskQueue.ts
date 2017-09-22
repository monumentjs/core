import {Task} from './Task';
import {Queue} from '../Collections/Queue';
import {TaskEvent} from './TaskEvent';
import {Assert} from '../Assertion/Assert';
import {Bind} from '../Language/Decorators/Bind';
import {Collection} from '../Collections/Collection';
import {IDisposable} from '../Core/Abstraction/IDisposable';


export class TaskQueue implements IDisposable {
    public static readonly MIN_CONCURRENCY: number = 1;
    public static readonly DEFAULT_CONCURRENCY: number = 1;

    private _tasksQueue: Queue<Task<any>> = new Queue<Task<any>>();
    private _runningTasks: Collection<Task<any>> = new Collection();
    private _isDisposed: boolean = false;
    private _concurrency: number;


    public get concurrency(): number {
        return this._concurrency;
    }


    public get isBusy(): boolean {
        return this._runningTasks.length > 0;
    }


    public get isIdle(): boolean {
        return this._runningTasks.length === 0;
    }


    public get isEmpty(): boolean {
        return this._tasksQueue.length === 0;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    protected get canRunOneMoreTask(): boolean {
        return !this.isDisposed && !this.isEmpty && this._runningTasks.length < this.concurrency;
    }


    public constructor(concurrency: number = TaskQueue.DEFAULT_CONCURRENCY) {
        Assert.argument('concurrency', concurrency).bounds(TaskQueue.MIN_CONCURRENCY, Infinity);

        this._concurrency = concurrency;
    }


    public addTask(task: Task<any>): void {
        task.addEventListener(TaskEvent.COMPLETE, this.onTaskFinish, true);
        task.addEventListener(TaskEvent.ERROR, this.onTaskFinish, true);
        task.addEventListener(TaskEvent.ABORT, this.onTaskFinish, true);

        this._tasksQueue.add(task);

        this.tryRunNextTask();
    }


    public dispose(): void {
        this._isDisposed = true;

        for (let task of this._tasksQueue) {
            task.abort();
        }

        for (let task of this._runningTasks) {
            task.abort();
        }

        this._tasksQueue.clear();
        this._runningTasks.clear();
    }

    
    @Bind()
    private onTaskFinish(event: TaskEvent): void {
        if (event != null) {
            this._runningTasks.remove(event.task);
        }
    }


    private tryRunNextTask(): void {
        if (this.canRunOneMoreTask) {
            let task: Task = this._tasksQueue.pop();

            this._runningTasks.add(task);

            task.start();
        }
    }
}
