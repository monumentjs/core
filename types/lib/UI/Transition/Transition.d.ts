import EventEmitter from '../../Core/Events/EventEmitter';
import Timeline from '../Animation/Timeline';
import TimelineEvent from '../Animation/TimelineEvent';
import { ICloneable } from '../../Core/types';
import { TransitionEventType, TimingFunction, EasingFunction } from '../Animation/types';
export default class Transition extends EventEmitter implements ICloneable<Transition> {
    private _ease;
    private _position;
    private _duration;
    private _value;
    private _from;
    private _to;
    private _scale;
    private _progress;
    private _delta;
    private _lastValue;
    private _easingFunction;
    private _timingFunction;
    readonly duration: number;
    readonly easingFunction: EasingFunction;
    readonly timingFunction: TimingFunction;
    constructor(duration: number, easingFunction?: EasingFunction, timingFunction?: TimingFunction);
    clone(): Transition;
    transition(from: number, to: number): Timeline;
    protected updateState(event: TimelineEvent): void;
    protected notify(type: TransitionEventType): void;
}
