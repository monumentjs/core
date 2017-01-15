import { IEvent } from './Event';
export declare type EventHandler = (event: IEvent) => void;
export default class EventEmitter {
    private _events;
    readonly types: string[];
    constructor();
    on(type: string, handler: EventHandler, context?: Object): EventEmitter;
    once(type: string, handler: EventHandler, context?: Object): EventEmitter;
    emit(event: IEvent): void;
    off(type: string, handler?: EventHandler): void;
    removeAllListeners(type?: string): void;
    /**
     * Creates and emits events of specified type.
     * Usually it overridden in sub-classes to unify process of events emitting.
     * @param type Event type.
     */
    protected notify(type: string): void;
    private checkEventSlot(type);
}
