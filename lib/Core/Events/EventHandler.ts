import {EventListener} from './types';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export default class EventHandler {
    public readonly eventType: string;
    public readonly eventListener: EventListener;
    public readonly removeAfterExecution: boolean;


    public constructor(eventType: string, eventListener: EventListener, removeAfterExecution: boolean) {
        assertArgumentNotNull('eventType', eventType);
        assertArgumentNotNull('eventListener', eventListener);
        assertArgumentNotNull('removeAfterExecution', removeAfterExecution);

        this.eventType = eventType;
        this.eventListener = eventListener;
        this.removeAfterExecution = removeAfterExecution;
    }
}
