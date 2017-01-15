import { IValidationRule, ValidationResult } from '../types';
export default class ListLengthRule implements IValidationRule<any> {
    private _min;
    private _max;
    readonly min: number;
    readonly max: number;
    constructor(min?: number | string, max?: number | string);
    validate(model: any, property: string): ValidationResult;
}
