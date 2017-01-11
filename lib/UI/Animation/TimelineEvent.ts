import Event from '../../Core/Event';
import {TimelineEventType} from './types';


export default class TimelineEvent extends Event {
    public static START: TimelineEventType = 'start';
    public static PROGRESS: TimelineEventType = 'progress';
    public static PAUSE: TimelineEventType = 'pause';
    public static STOP: TimelineEventType = 'stop';
    public static END: TimelineEventType = 'end';
    public static CHANGE: TimelineEventType = 'change';


    private _position: number;
    private _duration: number;
    private _progress: number;


    get position(): number {
        return this._position;
    }


    get duration(): number {
        return this._duration;
    }


    get progress(): number {
        return this._progress;
    }


    constructor(type: TimelineEventType, position: number, duration: number) {
        super(type);
        this._position = position;
        this._duration = duration;
        this._progress = position / duration;
    }
}