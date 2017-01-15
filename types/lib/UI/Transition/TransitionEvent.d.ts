import Event from '../../Core/Events/Event';
import { TransitionEventType } from '../Animation/types';
export default class TransitionEvent extends Event {
    static START: TransitionEventType;
    static PROGRESS: TransitionEventType;
    static END: TransitionEventType;
    static PAUSE: TransitionEventType;
    static STOP: TransitionEventType;
    private _value;
    private _duration;
    private _position;
    private _to;
    private _from;
    private _scale;
    private _progress;
    private _delta;
    /**
     * Value at current point of time.
     */
    readonly value: number;
    /**
     * Difference of current value compared to previous one.
     */
    readonly delta: number;
    /**
     * Transition progress. Value between 0 and 1.
     */
    readonly progress: number;
    /**
     * Total duration of transition.
     */
    readonly duration: number;
    /**
     * Current time offset of transition.
     */
    readonly position: number;
    /**
     * Destination value.
     */
    readonly to: number;
    /**
     * Source value.
     */
    readonly from: number;
    /**
     * Value returned by timing function. Value around the range of 0 and 1.
     */
    readonly scale: number;
    constructor(type: TransitionEventType, value: number, delta: number, progress: number, scale: number, from: number, to: number, position: number, duration: number);
}
