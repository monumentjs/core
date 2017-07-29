import {IValidator} from './IValidator';
import {Collection} from '../../Collections/Collection';


export class ValidatorCollection<T> extends Collection<IValidator<T>> implements IValidator<T> {
    public get isPristine(): boolean {
        return this._isPristine;
    }


    public get isDirty(): boolean {
        return !this._isPristine;
    }


    public get isInvalid(): boolean {
        return this._isInvalid;
    }


    private _isInvalid: boolean = true;
    private _isPristine: boolean = true;


    public validate(value: T): boolean {
        this._isInvalid = false;

        for (const validator of this) {
            this._isInvalid = !validator.validate(value);

            if (this._isInvalid) {
                break;
            }
        }

        this._isPristine = false;

        return !this._isInvalid;
    }
}
