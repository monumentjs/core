import Event from './Event';
import List from '../Collections/List';
import {EventListener} from './types';
import EventHandler from './EventHandler';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export default class EventEmitter {
    private _handlers: List<EventHandler> = new List<EventHandler>();


    public get types(): List<string> {
        return this._handlers.select((eventHandler: EventHandler): string => {
            return eventHandler.eventType;
        }).distinct();
    }


    public addEventListener(
        eventType: string,
        eventListener: EventListener,
        removeAfterExecution: boolean = false
    ): void {
        assertArgumentNotNull('eventType', eventType);
        assertArgumentNotNull('eventListener', eventListener);
        assertArgumentNotNull('removeAfterExecution', removeAfterExecution);

        this._handlers.add(new EventHandler(eventType, eventListener, removeAfterExecution));
    }


    public removeEventListener(
        eventType: string,
        eventListener: EventListener
    ): void {
        assertArgumentNotNull('eventType', eventType);
        assertArgumentNotNull('eventListener', eventListener);

        this._handlers.removeBy((eventHandler: EventHandler): boolean => {
            return eventHandler.eventType === eventType && eventHandler.eventListener === eventListener;
        });
    }


    public dispatchEvent(event: Event): boolean {
        assertArgumentNotNull('event', event);

        for (let index: number = 0; index < this._handlers.length; index++) {
            let eventHandler: EventHandler = this._handlers[index];

            if (eventHandler.eventType === event.type) {
                eventHandler.eventListener(event);

                if (eventHandler.removeAfterExecution) {
                    this._handlers.removeAt(index);

                    index--;
                }

                if (event.isCancelled) {
                    return false;
                }
            }
        }

        return true;
    }


    public removeEventListeners(eventType: string): void {
        assertArgumentNotNull('eventType', eventType);

        this._handlers.removeBy((eventHandler: EventHandler): boolean => {
            return eventHandler.eventType === eventType;
        });
    }


    public removeAllEventListeners(): void {
        this._handlers.clear();
    }

    /**
     * Creates and dispatches events of specified type.
     * Usually it is overridden in sub-classes to unify process of events emitting.
     * @param eventType Event type.
     */
    protected notify(eventType: string): void {
        this.dispatchEvent(new Event(eventType));
    }
}