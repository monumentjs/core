import {Runnable} from './Runnable';


export interface Task<TResult = void> {
    readonly isRunning: boolean;

    start()
    stop(): Promise<void>;
}
