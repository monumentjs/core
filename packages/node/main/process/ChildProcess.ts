import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ProcessClosedEventArgs} from './ProcessClosedEventArgs';
import {Channel} from './Channel';
import {EventArgs} from '@monument/core/main/events/EventArgs';
import {Event} from '@monument/core/main/events/Event';
import {ProcessMessageReceivedEventArgs} from './ProcessMessageReceivedEventArgs';


export interface ChildProcess<TMessage> extends Channel<TMessage> {
    readonly exited: Event<ChildProcess<TMessage>, ProcessExitedEventArgs>;
    readonly closed: Event<ChildProcess<TMessage>, ProcessClosedEventArgs>;
    readonly disconnected: Event<ChildProcess<TMessage>, EventArgs>;

    readonly messageReceived: Event<ChildProcess<TMessage>, ProcessMessageReceivedEventArgs<TMessage>>;

    readonly isKilled: boolean;

    kill(signal?: NodeJS.Signals): void;
}
