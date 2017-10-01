import {EventArgs} from './EventArgs';
import {IDisposable} from '../Core/Abstraction/IDisposable';
import {Map} from '../Collections/Map';
import {EventHandler} from './EventHandler';
import {EventHandlerFunction} from './types';


export class EventSource<TTarget extends object, TArgs extends EventArgs> {
    protected _handlers: Map<EventHandlerFunction<TTarget, TArgs>, EventHandler<TTarget, TArgs>> = new Map();


    public subscribe(handlerFunction: EventHandlerFunction<TTarget, TArgs>): IDisposable {
        const handler = new EventHandler(this._handlers, handlerFunction);

        this._handlers.put(handlerFunction, handler);

        return handler;
    }
}
