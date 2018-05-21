import {Event} from '@monument/events/main/Event';
import {ProcessMessage} from './ProcessMessage';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';


export interface Channel<TMessage> {
    readonly messageReceived: Event<Channel<TMessage>, ProcessMessageReceivedEventArgs<TMessage>>;

    send(message: ProcessMessage<TMessage>): Promise<void>;
}
