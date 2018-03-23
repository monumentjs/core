import {Exception} from '@monument/core/main/exceptions/Exception';
import {EventArgs} from './EventArgs';


export class ErrorEventArgs extends EventArgs {
    private _error: Exception;


    public get error(): Exception {
        return this._error;
    }


    public constructor(error: Exception) {
        super();

        this._error = error;
    }
}
