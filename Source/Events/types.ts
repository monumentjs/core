import {Event} from './Event';


export type EventListener = (event: Event) => void;


export type ActionListener = (action: object) => void;
export type ActionListenerCancel = () => boolean;

