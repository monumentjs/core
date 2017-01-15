import { IValidationRule, ValidationResult } from '../types';
export default class TextRequiredRule implements IValidationRule<any> {
    validate(model: any, property: string): ValidationResult;
}
