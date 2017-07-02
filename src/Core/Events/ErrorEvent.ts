import {Event} from './Event';
import {Assert} from '../Assertion/Assert';


export class ErrorEvent extends Event {
    public static ERROR: string = 'error';


    private _error: Error;


    public get error(): Error {
        return this._error;
    }


    public constructor(error: Error) {
        Assert.argument('error', error).notNull();

        super(ErrorEvent.ERROR);

        this._error = error;
    }
}
