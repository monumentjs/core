import {IReadOnlyCollection} from '../../Collections/Abstraction/IReadOnlyCollection';
import {EventListener} from '../types';


export interface IEventSource {
    readonly eventTypes: IReadOnlyCollection<string>;
    addEventListener(eventType: string, eventListener: EventListener, removeAfterExecution: boolean): void;
    removeEventListener(eventType: string, eventListener: EventListener): boolean;
    removeEventListeners(eventType: string): boolean;
    removeAllEventListeners(): boolean;
}
