import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Class} from '@monument/core/main/reflection/Class';
import {Parameter} from '@monument/core/main/reflection/Parameter';
import {Method} from '@monument/core/main/reflection/Method';
import {Field} from '@monument/core/main/reflection/Field';
import {Type} from '@monument/core/main/Type';


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
