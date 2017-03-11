import Event from './Event';
import {IEvent} from './IEvent';
import List from '../Collections/List';
import {EventListener} from './types';
import EventHandler from './EventHandler';


export default class EventEmitter {
    private _handlers: List<EventHandler> = new List<EventHandler>();
    private _duplicatedListenersAllowed: boolean = false;


    public get types(): List<string> {
        return this._handlers.select((eventHandler: EventHandler): string => {
            return eventHandler.eventType;
        });
    }


    public get duplicatedListenersAllowed(): boolean {
        return this._duplicatedListenersAllowed;
    }


    public set duplicatedListenersAllowed(value: boolean) {
        this._duplicatedListenersAllowed = value;
    }


    public addEventListener(
        eventType: string,
        eventListener: EventListener,
        removeAfterExecution: boolean = false
    ): void {
        if (!this._duplicatedListenersAllowed) {
            this.removeEventListener(eventType, eventListener);
        }

        this._handlers.add(new EventHandler(eventType, eventListener, removeAfterExecution));
    }


    public removeEventListener(
        eventType: string,
        eventListener: EventListener
    ): void {
        this._handlers.removeBy((eventHandler: EventHandler): boolean => {
            return eventHandler.eventType === eventType && eventHandler.eventListener === eventListener;
        });
    }


    public dispatchEvent(event: IEvent): void {
        this._handlers.forEach((eventHandler: EventHandler): void => {
            if (eventHandler.eventType === event.type) {
                eventHandler.eventListener(event);

                if (eventHandler.removeAfterExecution) {
                    this._handlers.remove(eventHandler);
                }
            }
        });
    }


    public removeAllEventListeners(eventType: string): void {
        this._handlers.removeBy((eventHandler: EventHandler): boolean => {
            return eventHandler.eventType === eventType;
        });
    }


    public clearEventListeners(): void {
        this._handlers.clear();
    }

    /**
     * Creates and dispatches events of specified type.
     * Usually it is overridden in sub-classes to unify process of events emitting.
     * @param type Event type.
     */
    protected notify(type: string) {
        this.dispatchEvent(new Event(type));
    }
}