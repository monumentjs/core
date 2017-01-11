import {IValidationRule, ValidationResult} from '../types';
import ValidationError from '../ValidationError';
import _includes from 'lodash/includes';
import _isArrayLike from 'lodash/isArrayLike';
import _each from 'lodash/each';


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

        if (_isArrayLike(this._item)) {
            _each(this._item, (item: any) => {
                if (_includes(values, item) === false) {
                    contains = false;
                }
            });
        } else {
            contains = _includes(values, this._item);
        }

        if (!contains) {
            errors.push(new ValidationError('validation.error.list.contains', model, property, this));
        }

        return Promise.resolve(errors);
    }
}