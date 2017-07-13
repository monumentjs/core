import { Task } from './Task';
import { IDisposable } from '../types';
export declare class TaskQueue implements IDisposable {
    private _queue;
    private _isDisposed;
    private _concurrentTasksLimit;
    private _runningTasksCount;
    readonly concurrentTasksLimit: number;
    readonly isBusy: boolean;
    readonly isIdle: boolean;
    readonly isEmpty: boolean;
    readonly isDisposed: boolean;
    protected readonly canRunOneMoreTask: boolean;
    constructor(concurrentTasksLimit?: number);
    addTask(task: Task<any>): void;
    dispose(): void;
    protected tryRunNextTask(): void;
}
