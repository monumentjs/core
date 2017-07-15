import {Event} from './Event';
import {List} from '../Collections/List';
import {EventListener} from './types';
import {EventHandler} from './EventHandler';
import {Assert} from '../Assertion/Assert';
import {ReadOnlyCollection} from '../Collections/ReadOnlyCollection';


export class EventEmitter {
    private _handlers: List<EventHandler> = new List<EventHandler>();


    public get eventTypes(): ReadOnlyCollection<string> {
        let typesList: List<string> = this._handlers.select((eventHandler: EventHandler): string => {
            return eventHandler.eventType;
        });

        let uniqueTypes: List<string> = typesList.distinct();

        return new ReadOnlyCollection(uniqueTypes);
    }


    public addEventListener(
        eventType: string,
        eventListener: EventListener,
        removeAfterExecution: boolean = false
    ): void {
        Assert.argument('eventType', eventType).notNull();
        Assert.argument('eventListener', eventListener).notNull();
        Assert.argument('removeAfterExecution', removeAfterExecution).notNull();

        this._handlers.add(new EventHandler(eventType, eventListener, removeAfterExecution));
    }


    public removeEventListener(
        eventType: string,
        eventListener: EventListener
    ): void {
        Assert.argument('eventType', eventType).notNull();
        Assert.argument('eventListener', eventListener).notNull();

        this._handlers.removeBy((eventHandler: EventHandler): boolean => {
            return eventHandler.eventType === eventType && eventHandler.eventListener === eventListener;
        });
    }


    public dispatchEvent(event: Event): boolean {
        Assert.argument('event', event).notNull();

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
        Assert.argument('eventType', eventType).notNull();

        this._handlers.removeBy((eventHandler: EventHandler): boolean => {
            return eventHandler.eventType === eventType;
        });
    }


    public removeAllEventListeners(): void {
        this._handlers.clear();
    }
}
