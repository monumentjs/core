import Task from './Job';
import {IDisposable, AsyncResult} from '../../Core/types';
import List from '../../Core/Collection/List';
import Store from '../../Core/Store';


export default class JobsQueue extends Store implements IDisposable {
    public static concurrent(ignoreQueueErrors: boolean = true): JobsQueue {
        return new JobsQueue(false, ignoreQueueErrors);
    }


    public static queue(ignoreQueueErrors: boolean = true): JobsQueue {
        return new JobsQueue(true, ignoreQueueErrors);
    }


    private _isDisposed: boolean = false;
    private _tasks: {processing: List<Task<any>>, scheduled: List<Task<any>>};
    private _isQueue: boolean;
    private _ignoreQueueErrors: boolean;
    private _chain: AsyncResult<any>;


    get isDisposed(): boolean {
        return this._isDisposed;
    }


    get isBusy() {
        return this._tasks.processing.length > 0 || this._tasks.scheduled.length > 0;
    }

    
    get isIdle() {
        return this._tasks.processing.length === 0 && this._tasks.scheduled.length === 0;
    }


    get isEmpty() {
        return this._tasks.scheduled.length === 0;
    }


    get processingTasks() {
        return this._tasks.processing;
    }


    get scheduledTasks() {
        return this._tasks.scheduled;
    }

    
    get isQueue() {
        return this._isQueue;
    }


    set isQueue(val) {
        this._isQueue = val;
    }

 
    get ignoreQueueErrors(): boolean {
        return this._ignoreQueueErrors;
    }

    /**
     * Create new instance of class JobsQueue.
     *
     * @param isQueue If this param is `true`, processingTasks will be queued and run one-by-one.
     * @param ignoreQueueErrors In queue mode, if this param is `true`, next task will run even if previous one failed.
     */
    constructor(isQueue: boolean = false, ignoreQueueErrors: boolean = true) {
        super();
        this._isQueue = isQueue;
        this._ignoreQueueErrors = ignoreQueueErrors;
        this._chain = Promise.resolve();
        this._tasks = {
            processing: new List<Task<any>>(),
            scheduled: new List<Task<any>>()
        };
    }


    public schedule(task: Task<any>): AsyncResult<any> {
        if (this._tasks.processing.length === 0) {
            this._tasks.processing.add(task);
        } else {
            this._tasks.scheduled.add(task);
        }

        if (!this._isQueue) {
            return this.run(task);
        } else {
            this._chain = this._chain.then(() => {
                return this.run(task);
            }, (err) => {
                if (this._isQueue && this._ignoreQueueErrors) {
                    return this.run(task);
                } else {
                    throw err;
                }
            });

            return this._chain;
        }
    }


    public dispose() {
        this._isDisposed = true;

        for (let task of this._tasks.processing) {
            task.dispose();
        }

        for (let task of this._tasks.scheduled) {
            task.dispose();
        }

        this._tasks.processing.clear();
        this._tasks.scheduled.clear();
    }


    protected run(task: Task<any>): AsyncResult<any> {
        let noScheduledTasks: boolean;
        let noActiveTasks: boolean;

        this._tasks.scheduled.remove(task);
        this._tasks.processing.remove(task);

        noActiveTasks = this._tasks.processing.length === 0;
        noScheduledTasks = this._tasks.scheduled.length === 0;

        this._tasks.processing.add(task);

        if (this._isQueue && noActiveTasks) {
            this.notify('busy');
        }

        if (this._isQueue && noScheduledTasks) {
            this.notify('empty');
        }

        return task.run().then((result) => {
            this.disposeTask(task);

            noActiveTasks = this._tasks.processing.length === 0;

            if (this._isQueue && noActiveTasks) {
                this.notify('idle');
            }

            return result;
        }, (err) => {
            this.disposeTask(task);

            noActiveTasks = this._tasks.processing.length === 0;

            if (this._isQueue && noActiveTasks) {
                this.notify('idle');
            }

            throw err;
        });
    }


    protected disposeTask(task: Task<any>) {
        this._tasks.processing.remove(task);

        if (!task.isDisposed) {
            task.dispose();
        }
    }
}