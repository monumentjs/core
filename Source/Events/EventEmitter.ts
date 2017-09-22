import {Event} from './Event';
import {EventListener} from './types';
import {EventHandler} from './EventHandler';
import {Map} from '../Collections/Map';
import {List} from '../Collections/List';
import {IEventSource} from './Abstraction/IEventSource';
import {IEventDispatcher} from './Abstraction/IEventDispatcher';
import {ISet} from '../Collections/Abstraction/ISet';


export class EventEmitter implements IEventSource, IEventDispatcher {
    private _handlers: Map<string, List<EventHandler>> = new Map();


    public get eventTypes(): ISet<string> {
        return this._handlers.keys;
    }


    public addEventListener(eventType: string, eventListener: EventListener, removeAfterExecution: boolean = false): void {
        const handler: EventHandler = new EventHandler(eventType, eventListener, removeAfterExecution);

        let handlers: List<EventHandler> | undefined = this._handlers.get(eventType);

        if (handlers == null) {
            handlers = new List();

            this._handlers.put(eventType, handlers);
        }

        handlers.add(handler);
    }


    public removeEventListener(eventType: string, eventListener: EventListener): boolean {
        const handlers: List<EventHandler> | undefined = this._handlers.get(eventType);

        if (handlers != null) {
            const hasRemoved: boolean = handlers.removeBy((eventHandler: EventHandler): boolean => {
                return eventHandler.eventType === eventType && eventHandler.eventListener === eventListener;
            });

            if (handlers.length === 0) {
                this._handlers.remove(eventType);
            }

            return hasRemoved;
        }

        return false;
    }


    public removeEventListeners(eventType: string): boolean {
        return this._handlers.remove(eventType) != null;
    }


    public removeAllEventListeners(): boolean {
        return this._handlers.clear();
    }


    public dispatchEvent(event: Event): boolean {
        const handlers: List<EventHandler> | undefined = this._handlers.get(event.type);

        if (handlers != null) {
            for (let index: number = 0; index < handlers.length; index++) {
                const handler: EventHandler = handlers[index] as EventHandler;

                handler.eventListener(event);

                if (handler.removeAfterExecution) {
                    handlers.removeAt(index);

                    index--;

                    if (handlers.length === 0) {
                        this._handlers.remove(event.type);
                    }
                }

                if (event.isCancelled) {
                    return false;
                }
            }
        }

        return true;
    }
}
