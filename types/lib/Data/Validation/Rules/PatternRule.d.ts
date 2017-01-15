import { IValidationRule, ValidationResult } from '../types';
export default class PatternRule implements IValidationRule<any> {
    private _pattern;
    readonly pattern: RegExp;
    constructor(pattern: RegExp);
    validate(model: any, property: string): ValidationResult;
}
