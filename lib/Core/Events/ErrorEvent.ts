import Event from './Event';


export default class ErrorEvent extends Event {
    private _error: Error;


    get error(): Error {
        return this._error;
    }


    constructor(error: Error) {
        super('error');

        this._error = error;
    }
}
