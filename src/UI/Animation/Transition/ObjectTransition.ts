import {Transition} from './Transition';
import {TransitionEvent} from './TransitionEvent';
import {TimingFunction, EasingFunction} from '../types';


export class ObjectTransition extends Transition {
    private _source: Object;
    private _property: string;


    get property(): string {
        return this._property;
    }


    get source(): Object {
        return this._source;
    }


    get value(): number {
        return this._source[this._property];
    }


    set value(val: number) {
        this.transition(this.value, val);
    }


    constructor(
        object: Object,
        property: string,
        duration: number,
        easingFunction?: EasingFunction,
        timingFunction?: TimingFunction
    ) {
        super(duration, easingFunction, timingFunction);

        this._property = property;
        this._source = object;

        this.addEventListener(TransitionEvent.PROGRESS, (event: TransitionEvent) => {
            this._source[this._property] += event.delta;
        });
    }
}