import {Task} from '../../src/Core/Async/Task';
import {AsyncResult} from '../../src/Core/types';


export default class FakeTask<R> extends Task<R> {
    private _preparedResult: R;
    private _preparedError: Error;
    private _msWait: number;


    public constructor(result?: R, error?: Error, msWait?: number) {
        super();

        this._preparedResult = result;
        this._preparedError = error;
        this._msWait = msWait;
    }


    protected async execute(): AsyncResult<void> {
        if (this._msWait) {
            setTimeout(function () {
                if (this._preparedResult) {
                    this.resolve(this._preparedResult);
                } else {
                    this.reject(this._preparedError);
                }
            }, this._msWait);
        } else {
            if (this._preparedResult) {
                this.resolve(this._preparedResult);
            } else {
                this.reject(this._preparedError);
            }
        }
    }
}