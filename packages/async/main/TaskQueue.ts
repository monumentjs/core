import {Disposable} from '../../core/main/Disposable';
import {Collection} from '../../collections/main/Collection';
import {ListQueue} from '@monument/collections/main/ListQueue';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Assert} from '@monument/assert/main/Assert';
import {Delegate} from '@monument/events-core/main/decorators/Delegate';
import {Task} from './Task';


export class TaskQueue<TResult> extends ListQueue<Task<TResult>> implements Disposable {
    public static readonly MIN_CONCURRENCY: number = 1;
    public static readonly DEFAULT_CONCURRENCY: number = 1;

    private _runningTasks: Collection<Task<TResult>> = new ArrayList();
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


    private get canRunOneMoreTask(): boolean {
        return !this.isEmpty && this._runningTasks.length < this.concurrency;
    }


    public constructor(concurrency: number = TaskQueue.DEFAULT_CONCURRENCY) {
        super();

        Assert.argument('concurrency', concurrency).bounds(TaskQueue.MIN_CONCURRENCY, Infinity);

        this._concurrency = concurrency;
    }


    public enqueue(task: Task<TResult>): boolean {
        task.completed.subscribe(this.handleTaskFinish);
        task.failed.subscribe(this.handleTaskFinish);
        task.aborted.subscribe(this.handleTaskFinish);

        super.enqueue(task);

        this.tryRunNextTask();

        return true;
    }


    public dispose(): void {
        for (let task of this._runningTasks) {
            task.dispose();
        }

        for (let task of this) {
            task.dispose();
        }

        this.clear();
        this._runningTasks.clear();
    }


    @Delegate()
    private handleTaskFinish(target: Operation<any>): void {
        this._runningTasks.remove(target);

        target.dispose();
    }


    private tryRunNextTask(): void {
        if (this.canRunOneMoreTask) {
            let task: Task<TResult> = this.pop();

            this._runningTasks.add(task);

            task.start();
        }
    }
}
