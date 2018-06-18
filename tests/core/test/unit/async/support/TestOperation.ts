import {Operation} from '@monument/core/main/async/Operation';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {InvalidOperationException} from '@monument/core/main/exceptions/InvalidOperationException';


export class TestOperation<R> extends Operation<R> {
    private readonly _preparedResult: R | undefined;
    private readonly _preparedError: Exception | undefined;
    private readonly _msWait: number | undefined;


    public constructor(result?: R, error?: Exception, msWait?: number) {
        super();

        this._preparedResult = result;
        this._preparedError = error;
        this._msWait = msWait;
    }


    protected execute(): Promise<R> {
        return new Promise((resolve, reject) => {
            if (this._msWait) {
                setTimeout(() => {
                    if (this._preparedResult) {
                        resolve(this._preparedResult);
                    } else {
                        reject(this._preparedError || new InvalidOperationException('Execution failed.'));
                    }
                }, this._msWait);
            } else {
                if (this._preparedResult) {
                    resolve(this._preparedResult);
                } else {
                    reject(this._preparedError || new InvalidOperationException('Execution failed.'));
                }
            }
        });
    }
}
