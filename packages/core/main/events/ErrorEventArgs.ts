import {Exception} from '../exceptions/Exception';
import {EventArgs} from './EventArgs';


export class ErrorEventArgs extends EventArgs {
    private readonly _exception: Exception;


    public get exception(): Exception {
        return this._exception;
    }


    public constructor(exception: Exception) {
        super();

        this._exception = exception;
    }
}
