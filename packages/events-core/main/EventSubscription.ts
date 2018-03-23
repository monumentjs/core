import {Map} from '../../collections-core/main/Map';
import {Disposable} from '../Core/Disposable';
import {EventArgs} from './EventArgs';
import {EventHandlerFunction} from './types';


export class EventSubscription<TTarget extends object, TArgs extends EventArgs> implements Disposable {
    private readonly _handlers: Map<EventHandlerFunction<TTarget, TArgs>, EventSubscription<TTarget, TArgs>>;
    private readonly _handler: EventHandlerFunction<TTarget, TArgs>;


    public get handler(): EventHandlerFunction<TTarget, TArgs> {
        return this._handler;
    }


    public constructor(
        handlers: Map<EventHandlerFunction<TTarget, TArgs>, EventSubscription<TTarget, TArgs>>,
        handler: EventHandlerFunction<TTarget, TArgs>
    ) {
        this._handlers = handlers;
        this._handler = handler;
    }


    public dispose(): void {
        this._handlers.remove(this._handler);
    }
}
