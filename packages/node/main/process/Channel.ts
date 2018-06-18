import {ProcessMessage} from './ProcessMessage';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';
import {Event} from '@monument/core/main/events/Event';


export interface Channel<TMessage> {
    readonly messageReceived: Event<Channel<TMessage>, ProcessMessageReceivedEventArgs<TMessage>>;

    send(message: ProcessMessage<TMessage>): Promise<void>;
}
