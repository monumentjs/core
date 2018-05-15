import {Event} from '@monument/events/main/Event';
import {ProcessMessage} from './ProcessMessage';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';


export interface Channel {
    readonly messageReceived: Event<Channel, ProcessMessageReceivedEventArgs>;

    send(message: ProcessMessage): Promise<void>;
}
