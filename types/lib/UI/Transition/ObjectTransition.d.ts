import Transition from './Transition';
import { TimingFunction, EasingFunction } from '../Animation/types';
export default class ObjectTransition extends Transition {
    private _source;
    private _property;
    readonly property: string;
    readonly source: Object;
    value: number;
    constructor(object: Object, property: string, duration: number, easingFunction?: EasingFunction, timingFunction?: TimingFunction);
}
