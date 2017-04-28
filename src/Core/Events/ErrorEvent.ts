import {Event} from './Event';
import {assertArgumentNotNull} from '../Assertion/Assert';


export class ErrorEvent extends Event {
    public static ERROR: string = 'error';


    private _error: Error;


    public get error(): Error {
        return this._error;
    }


    public constructor(error: Error) {
        assertArgumentNotNull('error', error);

        super(ErrorEvent.ERROR);

        this._error = error;
    }
}
