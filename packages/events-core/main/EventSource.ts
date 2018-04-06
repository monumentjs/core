import {Disposable} from '@monument/core/main/Disposable';
import {EventArgs} from './EventArgs';
import {EventHandlerFunction} from './types';


export interface EventSource<TArgs extends EventArgs> {
    subscribe(callback: EventHandlerFunction<TArgs>): Disposable;
}
