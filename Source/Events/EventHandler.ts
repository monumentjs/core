import {EventListener} from './types';
import {Assert} from '../Assertion/Assert';


export class EventHandler {
    public constructor(
        public readonly eventType: string,
        public readonly eventListener: EventListener,
        public readonly removeAfterExecution: boolean
    ) {
        Assert.argument('eventType', eventType).notNull();
        Assert.argument('eventListener', eventListener).notNull();
        Assert.argument('removeAfterExecution', removeAfterExecution).notNull();
    }
}
