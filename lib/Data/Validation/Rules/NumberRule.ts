import {ValidationResult} from '../types';
import ValidationError from '../ValidationError';
import PatternRule from './PatternRule';


const DEFAULT_NUMBER_PATTERN = /^(-)?(\d*\.)?\d+$/;


export default class NumberRule extends PatternRule {
    // TODO: add possibility to configure this rule to work with different number formats
    constructor(pattern: RegExp = DEFAULT_NUMBER_PATTERN) {
        super(pattern);
    }


    public validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let value: string = model[property] + '';
        let matches = this.pattern.test(value);

        if (!matches) {
            errors.push(new ValidationError('validation.error.number.patternMismatch', model, property, this));
        }

        return Promise.resolve(errors);
    }
}