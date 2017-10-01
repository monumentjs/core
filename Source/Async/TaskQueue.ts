import {Task} from './Task';
import {Queue} from '../Collections/Queue';
import {Assert} from '../Assertion/Assert';
import {Collection} from '../Collections/Collection';
import {IDisposable} from '../Core/Abstraction/IDisposable';
import {EventHandler} from '../Events/Decorators/EventHandler';


export class TaskQueue implements IDisposable {
    public static readonly MIN_CONCURRENCY: number = 1;
    public static readonly DEFAULT_CONCURRENCY: number = 1;

    private _tasksQueue: Queue<Task<any>> = new Queue<Task<any>>();
    private _runningTasks: Collection<Task<any>> = new Collection();
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


    private get canRunOneMoreTask(): boolean {
        return !this.isEmpty && this._runningTasks.length < this.concurrency;
    }


    public constructor(concurrency: number = TaskQueue.DEFAULT_CONCURRENCY) {
        Assert.argument('concurrency', concurrency).bounds(TaskQueue.MIN_CONCURRENCY, Infinity);

        this._concurrency = concurrency;
    }


    public addTask(task: Task<any>): void {
        task.onComplete.subscribe(this.handleTaskFinish);
        task.onError.subscribe(this.handleTaskFinish);
        task.onAbort.subscribe(this.handleTaskFinish);

        this._tasksQueue.add(task);

        this.tryRunNextTask();
    }


    public dispose(): void {
        for (let task of this._tasksQueue) {
            task.abort();
        }

        for (let task of this._runningTasks) {
            task.abort();
        }

        this._tasksQueue.clear();
        this._runningTasks.clear();
    }

    
    @EventHandler()
    private handleTaskFinish(target: Task<any>): void {
        this._runningTasks.remove(target);

        target.dispose();
    }


    private tryRunNextTask(): void {
        if (this.canRunOneMoreTask) {
            let task: Task = this._tasksQueue.pop();

            this._runningTasks.add(task);

            task.start();
        }
    }
}
