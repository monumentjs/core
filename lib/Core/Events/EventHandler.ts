import {EventListener} from './types';


export default class EventHandler {
    public readonly eventType: string;
    public readonly eventListener: EventListener;
    public readonly removeAfterExecution: boolean;


    public constructor(eventType: string, eventListener: EventListener, removeAfterExecution: boolean) {
        this.eventType = eventType;
        this.eventListener = eventListener;
        this.removeAfterExecution = removeAfterExecution;
    }
}
