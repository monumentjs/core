import {IValidationRule, ValidationResult} from '../types';
import ValidationError from '../ValidationError';


export default class TypeCheckRule implements IValidationRule<any> {
    private _type: string | Function;
    private _typeName: string;


    get type(): string | Function {
        return this._type;
    }


    get typeName(): string {
        return this._typeName;
    }


    constructor(type: string | Function) {
        this._type = type;
        this._typeName = typeof type === 'string' ? type : type.name;
    }


    public validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let value: any = model[property];

        if (
            (typeof this.type === 'string' && typeof value !== this.type) ||
            (typeof this.type === 'function' && value instanceof this.type === false)
        ) {
            errors.push(new ValidationError('validation.error.type.mismatch', model, property, this));
        }

        return Promise.resolve(errors);
    }
}