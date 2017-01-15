import {ValidationResult} from '../types';
import ValidationError from '../ValidationError';
import PatternRule from './PatternRule';


const EMAIL_PATTERN: RegExp = /^([^@]+)@([^@]+)\.([^@.]+)$/i;


export default class EmailRule extends PatternRule {
    constructor() {
        super(EMAIL_PATTERN);
    }


    public validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let value: string = model[property];
        let matches = this.pattern.test(value);

        if (!matches) {
            errors.push(new ValidationError('validation.error.email.patternMismatch', model, property, this));
        }

        return Promise.resolve(errors);
    }
}
