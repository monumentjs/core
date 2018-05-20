import {ProcessMessage} from './ProcessMessage';


export class ProcessMessageReceivedEventArgs<TMessage> {
    public readonly message: ProcessMessage<TMessage>;


    public constructor(message: ProcessMessage<TMessage>) {
        this.message = message;
    }
}
