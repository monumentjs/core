import {EventArgs} from './EventArgs';
import {Exception} from '../Exceptions/Exception';


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
