import {IDisposable, AsyncResult} from '../../Core/types';


export interface ITaskInfo {
    id?: string | number;
    name?: string;
    description?: string;
}


export interface ITaskExecutor<T> {
    (): AsyncResult<T>;
}


export default class Task<T> implements IDisposable {
    private _executor: ITaskExecutor<T>;
    private _id: string | number;
    private _name: string;
    private _description: string;
    private _result: AsyncResult<T>;
    private _isDisposed: boolean = false;


    get isDisposed() {
        return this._isDisposed;
    }


    get id(): string | number {
        return this._id;
    }


    get name(): string {
        return this._name;
    }


    get description(): string {
        return this._description;
    }

    /**
     *
     * @param executor
     * @param info
     */
    constructor(executor: ITaskExecutor<T>, info: ITaskInfo = {}) {
        this._id = info.id;
        this._name = info.name;
        this._description = info.description;
        this._executor = executor;
        this._result = null;
    }


    public run(): AsyncResult<T> {
        if (this._result == null) {
            this._result = this._executor();
        }

        return this._result;
    }


    public dispose() {
        this._isDisposed = true;
    }
}
