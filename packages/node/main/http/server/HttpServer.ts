import {Event} from '@monument/core/main/events/Event';
import {HttpMessageReceivedEventArgs} from './events/HttpMessageReceivedEventArgs';
import {ErrorEventArgs} from '@monument/core/main/events/ErrorEventArgs';


export interface HttpServer {
    readonly messageReceived: Event<this, HttpMessageReceivedEventArgs>;
    readonly errorThrown: Event<this, ErrorEventArgs>;
}
