import {EventEmitter} from '../../../Core/Events/EventEmitter';
import {Timeline} from '../Timeline';
import {EasingFactory} from '../EasingFactory';
import {TimelineEvent} from '../TimelineEvent';
import {TransitionEvent} from './TransitionEvent';
import {ICloneable} from '../../../Core/types';
import {TransitionEventType, TransitionFunction, TimingFunction, EasingFunction} from '../types';


export class Transition extends EventEmitter implements ICloneable<Transition> {
    private _ease: TransitionFunction;
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


    public get duration(): number {
        return this._duration;
    }


    public get easingFunction(): EasingFunction {
        return this._easingFunction;
    }


    public get timingFunction(): TimingFunction {
        return this._timingFunction;
    }

    
    public constructor(
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
        let timeLine = new Timeline(this._duration);

        this._lastValue = from;
        this._from = from;
        this._to = to;

        timeLine.addEventListener(TimelineEvent.PROGRESS, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.PROGRESS);
        });

        timeLine.addEventListener(TimelineEvent.START, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.START);
        });

        timeLine.addEventListener(TimelineEvent.END, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.END);
        });

        timeLine.addEventListener(TimelineEvent.PAUSE, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.PAUSE);
        });

        timeLine.addEventListener(TimelineEvent.STOP, (event: TimelineEvent) => {
            this.updateState(event);
            this.notify(TransitionEvent.STOP);
        });

        timeLine.play();

        return timeLine;
    }


    protected updateState(event: TimelineEvent): void {
        this._position = event.position;
        this._duration = event.duration;
        this._progress = event.position / event.duration;
        this._scale = this._ease(this._progress);
        this._value = this._from + (this._to - this._from) * this._scale;
        this._delta = this._value - this._lastValue;
        this._lastValue = this._value;
    }


    protected notify(type: TransitionEventType): void {
        this.dispatchEvent(new TransitionEvent(
            type,
            this._value, this._delta,
            this._progress, this._scale,
            this._from, this._to,
            this._position, this._duration
        ));
    }
}