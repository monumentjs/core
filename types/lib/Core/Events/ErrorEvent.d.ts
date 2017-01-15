import Event from './Event';
export default class ErrorEvent extends Event {
    private _error;
    readonly error: Error;
    constructor(error: Error);
}
