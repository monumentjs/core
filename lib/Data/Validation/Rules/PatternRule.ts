import {IValidationRule, ValidationResult} from '../types';
import ValidationError from '../ValidationError';


export default class PatternRule implements IValidationRule<any> {
    private _pattern: RegExp;


    get pattern(): RegExp {
        return this._pattern;
    }


    constructor(pattern: RegExp) {
        this._pattern = pattern;
    }


    public validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let value: string = model[property];
        let matches = this._pattern.test(value);

        if (!matches) {
            errors.push(new ValidationError('validation.error.text.patternMismatch', model, property, this));
        }

        return Promise.resolve(errors);
    }
}