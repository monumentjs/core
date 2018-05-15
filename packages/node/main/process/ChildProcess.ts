import {Event} from '@monument/events/main/Event';
import {EventArgs} from '@monument/events/main/EventArgs';
import {ProcessExitedEventArgs} from './ProcessExitedEventArgs';
import {ProcessClosedEventArgs} from './ProcessClosedEventArgs';
import {Channel} from './Channel';


export interface ChildProcess extends Channel {
    readonly exited: Event<ChildProcess, ProcessExitedEventArgs>;
    readonly closed: Event<ChildProcess, ProcessClosedEventArgs>;
    readonly disconnected: Event<ChildProcess, EventArgs>;

    readonly isKilled: boolean;

    kill(signal?: NodeJS.Signals): void;
}
