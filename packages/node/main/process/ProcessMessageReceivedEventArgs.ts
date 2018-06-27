import {ProcessMessage} from './ProcessMessage';
import {EventArgs} from '@monument/core/main/events/EventArgs';


export class ProcessMessageReceivedEventArgs<TMessage> extends EventArgs {
    public readonly message: ProcessMessage<TMessage>;


    public constructor(message: ProcessMessage<TMessage>) {
        super();
        this.message = message;
    }
}
