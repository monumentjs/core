import {Event} from '@monument/core/main/events/Event';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';
import {ProcessMessage} from './ProcessMessage';


export interface Channel<TMessage> {
    readonly messageReceived: Event<Channel<TMessage>, ProcessMessageReceivedEventArgs<TMessage>>;

    sendMessage(message: ProcessMessage<TMessage>): Promise<void>;
}
