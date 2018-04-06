import {Key} from '@monument/object-model/main/Key';
import {Method} from '../Method';
import {Class} from '../Class';
import {Decorator} from '../Decorator';
import {Parameter} from '../Parameter';
import {Field} from '../Field';


class WithAttributeDecorator<T> extends Decorator {
    private readonly _key: Key<T>;
    private readonly _value: T;


    public constructor(annotation: Function, key: Key<T>, value: T) {
        super(annotation);

        this._key = key;
        this._value = value;
    }


    protected onClass(klass: Class<any>): void {
        klass.setAttribute(this._key, this._value);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.setAttribute(this._key, this._value);
    }


    protected onField(klass: Class<any>, field: Field): void {
        field.setAttribute(this._key, this._value);
    }


    protected onMethodParameter(klass: Class<any>, method: Method, parameter: Parameter): void {
        parameter.setAttribute(this._key, this._value);
    }


    protected onConstructorParameter(klass: Class<any>, parameter: Parameter): void {
        parameter.setAttribute(this._key, this._value);
    }
}


export function WithAttribute<T>(key: Key<T>, value: T) {
    return function (...args: any[]) {
        new WithAttributeDecorator(WithAttribute, key, value).apply(args);
    };
}
