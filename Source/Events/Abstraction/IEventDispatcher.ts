import {Event} from '../Event';


export interface IEventDispatcher {
    dispatchEvent(event: Event): boolean;
}
