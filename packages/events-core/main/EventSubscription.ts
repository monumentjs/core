import {Disposable} from '@monument/core/main/Disposable';
import {Map} from '../../collections/main/Map';
import {EventArgs} from './EventArgs';
import {EventHandlerFunction} from './types';


export class EventSubscription<TArgs extends EventArgs> implements Disposable {
    private readonly _handlers: Map<EventHandlerFunction<TArgs>, EventSubscription<TArgs>>;
    private readonly _handler: EventHandlerFunction<TArgs>;


    public get handler(): EventHandlerFunction<TArgs> {
        return this._handler;
    }


    public constructor(
        handlers: Map<EventHandlerFunction<TArgs>, EventSubscription<TArgs>>,
        handler: EventHandlerFunction<TArgs>
    ) {
        this._handlers = handlers;
        this._handler = handler;
    }


    public dispose(): void {
        this._handlers.remove(this._handler);
    }
}
