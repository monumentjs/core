import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';
import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ProcessClosedEventArgs} from './ProcessClosedEventArgs';
import {Channel} from './Channel';


export interface ChildProcess<TMessage> extends Channel<TMessage> {
    readonly exited: Event<ChildProcess<TMessage>, ProcessExitedEventArgs>;
    readonly closed: Event<ChildProcess<TMessage>, ProcessClosedEventArgs>;
    readonly disconnected: Event<ChildProcess<TMessage>, EventArgs>;

    readonly isKilled: boolean;

    kill(signal?: NodeJS.Signals): void;
}
