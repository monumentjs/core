import {Type} from '@monument/core/main/Type';
import {Class} from '../../../../main/Class';
import {Field} from '../../../../main/Field';
import {Method} from '../../../../main/Method';
import {Parameter} from '../../../../main/Parameter';
import {Decorator} from '../../../../main/Decorator';


class ExampleDecorator extends Decorator {

    protected onClass(klass: Class<any>): void {
        klass.decorate(Example);
    }


    protected onConstructorParameter(klass: Class<any>, parameter: Parameter): void {
        parameter.decorate(Example);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Example);
    }


    protected onMethodParameter(klass: Class<any>, method: Method, parameter: Parameter): void {
        parameter.decorate(Example);
    }


    protected onField(klass: Class<any>, field: Field): void {
        field.decorate(Example);
    }


    protected onProperty(klass: Class<any>, key: string | symbol, type: Type<any> | undefined): void {
        // Stub
    }
}


export function Example(...args: any[]) {
    new ExampleDecorator().apply(args);
}
