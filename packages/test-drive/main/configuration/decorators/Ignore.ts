import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Decorator} from '@monument/reflection/main/Decorator';


class IgnoreDecorator extends Decorator {
    protected onClass(klass: Class<any>): void {
        klass.decorate(Ignore);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Ignore);
    }
}


export function Ignore(...args: any[]): void {
    new IgnoreDecorator().apply(args);
}
