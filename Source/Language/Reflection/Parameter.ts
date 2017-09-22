import {AccessibleObject} from './AccessibleObject';
import {Type} from '../../Core/Types/Type';


export class Parameter<T> extends AccessibleObject {
    private _type: Type<T> | undefined;
    private _value: T | undefined;


    public get type(): Type<T> | undefined {
        return this._type;
    }


    public set type(value: Type<T> | undefined) {
        this._type = value;
    }


    public get value(): undefined | T {
        return this._value;
    }


    public set value(value: undefined | T) {
        this._value = value;
    }
}
