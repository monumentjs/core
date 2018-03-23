import {ProcessEventArgs} from './ProcessEventArgs';
import {ProcessMessage} from './ProcessMessage';


export class ProcessMessageEventArgs extends ProcessEventArgs {
    private _message: ProcessMessage;


    public get message(): ProcessMessage {
        return this._message;
    }


    public constructor(message: ProcessMessage) {
        super();

        this._message = message;
    }
}
