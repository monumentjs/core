import {Task} from '../../lib/System/Automation/Task';
import {AsyncResult} from '../../lib/Core/types';


export default class FakeTask<R> extends Task<R> {
    private _preparedResult: R;
    private _preparedError: Error;
    private _msWait: number;


    constructor(result?: R, error?: Error, msWait?: number) {
        super();

        this._preparedResult = result;
        this._preparedError = error;
        this._msWait = msWait;
    }


    protected async doJob(): AsyncResult<void> {
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