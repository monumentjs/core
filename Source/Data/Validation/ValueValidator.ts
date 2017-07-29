import {IValidator} from './IValidator';
import {List} from '../../Collections/List';
import {ValidateFunction} from './types';


export class ValueValidator<T> implements IValidator<T> {
    public get isPristine(): boolean {
        return this._isPristine;
    }


    public get isDirty(): boolean {
        return !this._isPristine;
    }


    public get isInvalid(): boolean {
        return this._isInvalid;
    }


    public get isNull(): boolean {
        return this._isNull;
    }


    private _isInvalid: boolean = true;
    private _isPristine: boolean = true;
    private _isNull: boolean = true;
    private _validators: List<ValidateFunction<T>> = new List();


    public constructor() {
        this.addValidator((value: T): boolean => {
            this._isNull = value == null;

            return this._isNull;
        });
    }


    public validate(value: T): boolean {
        this._isInvalid = this._validators.any((validator: ValidateFunction<T>): boolean => {
            return validator(value);
        });

        this._isPristine = false;

        return !this._isInvalid;
    }


    protected addValidator(validator: ValidateFunction<T>): void {
        this._validators.add(validator);
    }
}
