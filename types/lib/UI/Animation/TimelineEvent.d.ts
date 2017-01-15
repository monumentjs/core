import Event from '../../Core/Events/Event';
import { TimelineEventType } from './types';
export default class TimelineEvent extends Event {
    static START: TimelineEventType;
    static PROGRESS: TimelineEventType;
    static PAUSE: TimelineEventType;
    static STOP: TimelineEventType;
    static END: TimelineEventType;
    static CHANGE: TimelineEventType;
    private _position;
    private _duration;
    private _progress;
    readonly position: number;
    readonly duration: number;
    readonly progress: number;
    constructor(type: TimelineEventType, position: number, duration: number);
}
