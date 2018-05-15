import {ProcessMessage} from './ProcessMessage';


export class ProcessMessageReceivedEventArgs {
    public readonly message: ProcessMessage;


    public constructor(message: ProcessMessage) {
        this.message = message;

    }
}
