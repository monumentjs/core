import {IValidationRule, ValidationResult} from '../types';
import ValidationError from '../ValidationError';


export default class TextRequiredRule implements IValidationRule<any> {

    public validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let value: string = model[property];

        if (value.length === 0) {
            errors.push(new ValidationError('validation.error.text.required', model, property, this));
        }

        return Promise.resolve(errors);
    }
}