import { Event } from './Event';
export declare class ErrorEvent extends Event {
    static ERROR: string;
    private _error;
    readonly error: Error;
    constructor(error: Error);
}
