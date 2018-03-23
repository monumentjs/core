import {Runnable} from './Runnable';


export interface Task<TResult = void> extends Runnable<TResult> {
    readonly isRunning: boolean;

    stop(): Promise<void>;
}
