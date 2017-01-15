import { Task } from './Task';
import { IDisposable } from '../../Core/types';
export default class TasksQueue implements IDisposable {
    private _queue;
    private _isDisposed;
    private _concurrentTasksLimit;
    private _runningTasksCount;
    readonly isBusy: boolean;
    readonly isIdle: boolean;
    readonly isEmpty: boolean;
    readonly isDisposed: boolean;
    /**
     * Creates new instance of class.
     *
     * @param concurrentTasksLimit
     */
    constructor(concurrentTasksLimit?: number);
    enqueue(task: Task<any>): void;
    dispose(): void;
    protected tryRunNextTask(): void;
}
