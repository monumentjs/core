import {EventHandler} from './EventHandler';
import {EventArgs} from './EventArgs';


export interface Event<TTarget extends object, TArgs extends EventArgs> {
    subscribe(handler: EventHandler<TTarget, TArgs>): boolean;
    unsubscribe(handler: EventHandler<TTarget, TArgs>): boolean;
}
