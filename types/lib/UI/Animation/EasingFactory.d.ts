import { IFactory } from '../../Core/types';
import { IEasingFunction, TimingFunction, EasingFunction } from './types';
export default class EasingFactory implements IFactory<IEasingFunction> {
    private _eases;
    constructor();
    create(easingFunction: EasingFunction, timingFunction: TimingFunction): IEasingFunction;
}
