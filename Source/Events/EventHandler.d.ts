import { EventListener } from './types';
export declare class EventHandler {
    readonly eventType: string;
    readonly eventListener: EventListener;
    readonly removeAfterExecution: boolean;
    constructor(eventType: string, eventListener: EventListener, removeAfterExecution: boolean);
}
