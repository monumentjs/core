import {Type} from '@monument/core/main/Type';
import {DecoratorTarget} from 'DecoratorTarget';
import {ReadOnlySet} from '../../../collections/main/ReadOnlySet';
import {ListSet} from '@monument/collections/main/ListSet';
import {Decorator} from '../Decorator';
import {Class} from '../Class';
import {Method} from '../Method';
import {Field} from '../Field';
import {Parameter} from '../Parameter';


class TargetDecorator extends Decorator {
    private _targets: ReadOnlySet<DecoratorTarget>;


    public constructor(annotation: Function, targets: ReadOnlySet<DecoratorTarget>) {
        super(annotation);
        this._targets = targets;
    }


    protected onClass(klass: Class<any>) {
        if (!this._targets.contains(DecoratorTarget.CLASS)) {
            super.onClass(klass);
        }
    }


    protected onMethod(klass: Class<any>, method: Method) {
        if (!this._targets.contains(DecoratorTarget.METHOD)) {
            super.onMethod(klass, method);
        }
    }


    protected onField(klass: Class<any>, field: Field) {
        if (!this._targets.contains(DecoratorTarget.FIELD)) {
            super.onField(klass, field);
        }
    }


    protected onProperty(klass: Class<any>, key: string | symbol, type: Type<any> | undefined) {
        if (!this._targets.contains(DecoratorTarget.FIELD)) {
            super.onProperty(klass, key, type);
        }
    }


    protected onMethodParameter(klass: Class<any>, method: Method, parameter: Parameter) {
        if (!this._targets.contains(DecoratorTarget.METHOD_PARAMETER)) {
            super.onMethodParameter(klass, method, parameter);
        }
    }


    protected onConstructorParameter(klass: Class<any>, parameter: Parameter) {
        if (!this._targets.contains(DecoratorTarget.CONSTRUCTOR_PARAMETER)) {
            super.onConstructorParameter(klass, parameter);
        }
    }
}


export function Target(targets: DecoratorTarget[]) {
    return function (...args: any[]) {
        new TargetDecorator(Target, new ListSet(targets)).apply(args);
    };
}
