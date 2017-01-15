import { IValidationRule, ValidationResult } from '../types';
export default class TypeCheckRule implements IValidationRule<any> {
    private _type;
    private _typeName;
    readonly type: string | Function;
    readonly typeName: string;
    constructor(type: string | Function);
    validate(model: any, property: string): ValidationResult;
}
