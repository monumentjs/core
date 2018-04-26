import {Event} from '@monument/events/main/Event';
import {ProcessInfo} from './ProcessInfo';


export interface Process<TMessage> {
    readonly messageReceived: Event<Process<TMessage>, TMessage>;
    readonly info: Promise<ProcessInfo>;

    send(message: TMessage): Promise<void>;
    exit(exitCode?: number): Promise<void>;
}
