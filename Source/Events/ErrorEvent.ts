import {Event} from './Event';


export class ErrorEvent extends Event {
    public static ERROR: string = 'error';


    private _error: Error;


    public get error(): Error {
        return this._error;
    }


    public constructor(error: Error) {
        super(ErrorEvent.ERROR);

        this._error = error;
    }
}
