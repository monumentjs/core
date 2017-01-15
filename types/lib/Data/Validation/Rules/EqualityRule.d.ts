import { IValidationRule, ValidationResult } from '../types';
export default class EqualityRule implements IValidationRule<any> {
    private _target;
    readonly target: string;
    constructor(target: string);
    validate(model: any, property: string): ValidationResult;
}
