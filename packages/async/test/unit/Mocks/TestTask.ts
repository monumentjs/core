import {Operation} from '../../../main/Operation';
import {Exception} from '../../../../core/main/exceptions/Exception';
import {InvalidOperationException} from '../../../../core/main/exceptions/InvalidOperationException';


export class TestTask<R> extends Operation<R> {
    private _preparedResult: R | undefined;
    private _preparedError: Exception | undefined;
    private _msWait: number | undefined;


    public constructor(result?: R, error?: Exception, msWait?: number) {
        super({
            run: (): Promise<R> => {
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
        });

        this._preparedResult = result;
        this._preparedError = error;
        this._msWait = msWait;
    }
}
