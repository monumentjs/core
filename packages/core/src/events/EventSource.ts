import {EventHandler} from './EventHandler';
import {EventArgs} from './EventArgs';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface EventSource<TArgs extends EventArgs<object>> {
    subscribe(handler: EventHandler<TArgs>): boolean;
    unsubscribe(handler: EventHandler<TArgs>): boolean;
}
