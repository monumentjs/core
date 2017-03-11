import {IValidationRule, ValidationResult} from '../types';
import ValidationError from '../ValidationError';


export default class ListContainsRule implements IValidationRule<any> {
    private _item: any | ArrayLike<any>;


    get item(): any | ArrayLike<any> {
        return this._item;
    }


    constructor(item: any | ArrayLike<any> | Function) {
        if (typeof item === 'function') {
            item = item();
        }

        this._item = item;
    }


    public validate(model: any, property: string): ValidationResult {
        let errors: ValidationError[] = [];
        let values: ArrayLike<any> = model[property];
        let contains: boolean = true;


        if (!contains) {
            errors.push(new ValidationError('validation.error.list.contains', model, property, this));
        }

        return Promise.resolve(errors);
    }
}