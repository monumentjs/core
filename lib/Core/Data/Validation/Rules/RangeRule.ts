import {IValidationRule, ValidationResult} from '../types';
import ValidationError from '../ValidationError';


export default class RangeRule implements IValidationRule<any> {
    private _min: number;
    private _max: number;


    get min(): number {
        return this._min;
    }


    get max(): number {
        return this._max;
    }


    constructor(min: number|string = -Infinity, max: number|string = Infinity) {
        this._min = min === -Infinity ? min : parseInt(min as string, 10);
        this._max = max === Infinity ? max : parseInt(max as string, 10);

        if (this._min >= this._max) {
            throw new ValidationError('validation.exception.invalidRange', null, null, this);
        }
    }


    public validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let value: number = model[property];
        let lessThanMin = value < this._min;
        let greaterThanMax = value > this._max;

        if (lessThanMin) {
            errors.push(new ValidationError('validation.error.number.min', model, property, this));
        }

        if (greaterThanMax) {
            errors.push(new ValidationError('validation.error.number.max', model, property, this));
        }

        return Promise.resolve(errors);
    }
}