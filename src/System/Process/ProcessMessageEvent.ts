import {ProcessEvent} from './ProcessEvent';
import {Process} from './Process';


export class ProcessMessageEvent extends ProcessEvent {
    private _message: object;


    public get message(): object {
        return this._message;
    }


    public constructor(process: Process, message: object) {
        super(ProcessMessageEvent.MESSAGE, process);

        this._message = message;
    }
}