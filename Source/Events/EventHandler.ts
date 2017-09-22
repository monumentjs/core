import {EventListener} from './types';


export class EventHandler {
    public constructor(
        public readonly eventType: string,
        public readonly eventListener: EventListener,
        public readonly removeAfterExecution: boolean
    ) {}
}
