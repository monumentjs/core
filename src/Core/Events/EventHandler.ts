import {EventListener} from './types';
import {Assert} from '../Assertion/Assert';


export class EventHandler {
    public readonly eventType: string;
    public readonly eventListener: EventListener;
    public readonly removeAfterExecution: boolean;


    public constructor(eventType: string, eventListener: EventListener, removeAfterExecution: boolean) {
        Assert.argument('eventType', eventType).notNull();
        Assert.argument('eventListener', eventListener).notNull();
        Assert.argument('removeAfterExecution', removeAfterExecution).notNull();

        this.eventType = eventType;
        this.eventListener = eventListener;
        this.removeAfterExecution = removeAfterExecution;
    }
}
