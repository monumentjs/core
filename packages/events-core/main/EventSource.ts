import {EventArgs} from './EventArgs';
import {Disposable} from '../Core/Disposable';
import {EventHandlerFunction} from './types';


export interface EventSource<TTarget extends object, TArgs extends EventArgs> {
    subscribe(callback: EventHandlerFunction<TTarget, TArgs>): Disposable;
}
