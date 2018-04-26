import {Process} from './Process';
import Signals = NodeJS.Signals;


export interface SubProcess<TMessage> extends Process<TMessage> {
    readonly isKilled: boolean;

    kill(signal?: Signals): void;
}
