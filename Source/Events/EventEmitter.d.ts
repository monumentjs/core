import { Event } from './Event';
import { EventListener } from './types';
import { ReadOnlyCollection } from '../Collections/ReadOnlyCollection';
export declare class EventEmitter {
    private _handlers;
    readonly eventTypes: ReadOnlyCollection<string>;
    addEventListener(eventType: string, eventListener: EventListener, removeAfterExecution?: boolean): void;
    removeEventListener(eventType: string, eventListener: EventListener): void;
    dispatchEvent(event: Event): boolean;
    removeEventListeners(eventType: string): void;
    removeAllEventListeners(): void;
}
