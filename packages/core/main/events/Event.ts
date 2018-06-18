import {EventHandler} from './EventHandler';


export interface Event<TTarget extends object, TArgs> {
    subscribe(handler: EventHandler<TTarget, TArgs>): boolean;
    unsubscribe(handler: EventHandler<TTarget, TArgs>): boolean;
}
