import EventEmitter from '../../Core/Events/EventEmitter';
import Timeline from '../Animation/Timeline';
import EasingFactory from '../Animation/EasingFactory';
import TimelineEvent from '../Animation/TimelineEvent';
import TransitionEvent from './TransitionEvent';
import {ICloneable} from '../../Core/types';
import {TransitionEventType, IEasingFunction, TimingFunction, EasingFunction} from '../Animation/types';


export default class Transition extends EventEmitter implements ICloneable<Transition> {
    private _ease: IEasingFunction;
    private _position: number;
    private _duration: number;
    private _value: number;
    private _from: number;
    private _to: number;
    private _scale: number;
    private _progress: number;
    private _delta: number;
    private _lastValue: number;
    private _easingFunction: EasingFunction;
    private _timingFunction: TimingFunction;


    get duration(): number {
        return this._duration;
    }


    get easingFunction(): EasingFunction {
        return this._easingFunction;
    }


    get timingFunction(): TimingFunction {
        return this._timingFunction;
    }

    
    constructor(
        duration: number,
        easingFunction: EasingFunction = EasingFunction.EaseInOut,
        timingFunction: TimingFunction = TimingFunction.Cubic
    ) {
        super();
        this._easingFunction = easingFunction;
        this._timingFunction = timingFunction;
        this._ease = new EasingFactory().create(easingFunction, timingFunction);
        this._duration = duration;
    }


    public clone(): Transition {
        return new Transition(this._duration, this._easingFunction, this._timingFunction);
    }


    public transition(from: number, to: number): Timeline {
        let timeline = new Timeline(this._duration);

        this._lastValue = from;
        this._from = from;
        this._to = to;

        timeline.addEventListener(TimelineEvent.PROGRESS, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.PROGRESS);
        });

        timeline.addEventListener(TimelineEvent.START, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.START);
        });

        timeline.addEventListener(TimelineEvent.END, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.END);
        });

        timeline.addEventListener(TimelineEvent.PAUSE, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.PAUSE);
        });

        timeline.addEventListener(TimelineEvent.STOP, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.STOP);
        });

        timeline.play();

        return timeline;
    }


    protected updateState(event: TimelineEvent) {
        this._position = event.position;
        this._duration = event.duration;
        this._progress = event.position / event.duration;
        this._scale = this._ease(this._progress);
        this._value = this._from + (this._to - this._from) * this._scale;
        this._delta = this._value - this._lastValue;
        this._lastValue = this._value;
    }


    protected notify(type: TransitionEventType) {
        this.dispatchEvent(new TransitionEvent(
            type,
            this._value, this._delta,
            this._progress, this._scale,
            this._from, this._to,
            this._position, this._duration
        ));
    }
}