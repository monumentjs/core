import { IValidationRule, ValidationResult } from '../types';
export default class ListContainsRule implements IValidationRule<any> {
    private _item;
    readonly item: any | ArrayLike<any>;
    constructor(item: any | ArrayLike<any> | Function);
    validate(model: any, property: string): ValidationResult;
}
