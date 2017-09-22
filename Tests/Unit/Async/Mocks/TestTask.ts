
import {Task} from '../../../../Source/Async/Task';
import {Exception} from '../../../../Source/Exceptions/Exception';


export class TestTask<R> extends Task<R> {
    private _preparedResult: R | undefined;
    private _preparedError: Error | undefined;
    private _msWait: number | undefined;


    public constructor(result?: R | undefined, error?: Error | undefined, msWait?: number | undefined) {
        super();

        this._preparedResult = result;
        this._preparedError = error;
        this._msWait = msWait;
    }


    protected async execute(): Promise<void> {
        if (this._msWait) {
            setTimeout(() => {
                if (this._preparedResult) {
                    this.resolve(this._preparedResult);
                } else {
                    this.reject(this._preparedError || new Exception('Execution failed.'));
                }
            }, this._msWait);
        } else {
            if (this._preparedResult) {
                this.resolve(this._preparedResult);
            } else {
                this.reject(this._preparedError || new Exception('Execution failed.'));
            }
        }
    }
}
