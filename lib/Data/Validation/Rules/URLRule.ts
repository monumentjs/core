import {ValidationResult} from '../types';
import ValidationError from '../ValidationError';
import PatternRule from './PatternRule';


const DEFAULT_URL_PATTERN = /(.+):\/\/(.+)/;


export default class URLRule extends PatternRule {
    constructor(pattern: RegExp = DEFAULT_URL_PATTERN) {
        super(pattern);
    }


    public async validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let value: string = model[property];
        let matches = this.pattern.test(value);

        if (!matches) {
            errors.push(new ValidationError('validation.error.url.patternMismatch', model, property, this));
        }

        return errors;
    }
}