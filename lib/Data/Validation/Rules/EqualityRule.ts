import {IValidationRule, ValidationResult} from '../types';
import ValidationError from '../ValidationError';


export default class EqualityRule implements IValidationRule<any> {
    private _target: string;


    get target(): string {
        return this._target;
    }


    constructor(target: string) {
        this._target = target;
    }


    public validate(model: any, property: string): ValidationResult {
        let value: any = model[property];
        let target: any = model[this._target];
        let errors: ValidationError[] = [];

        if (value !== target) {
            errors.push(new ValidationError('validation.error.equality', model, property, this));
        }

        return Promise.resolve(errors);
    }
}