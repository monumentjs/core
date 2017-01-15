import {ValidationResult} from '../types';
import ValidationError from '../ValidationError';
import PatternRule from './PatternRule';


export default class PhoneRule extends PatternRule {
    public validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let value: string = model[property];
        let matches = this.pattern.test(value);

        if (!matches) {
            errors.push(new ValidationError('validation.error.phone.patternMismatch', model, property, this));
        }

        return Promise.resolve(errors);
    }
}