import {Class} from '@monument/reflection/main/Class';
import {Decorator} from '@monument/reflection/main/Decorator';
import {Method} from '@monument/reflection/main/Method';


class AfterAllDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(AfterAll);
    }
}


export function AfterAll(...args: any[]) {
    new AfterAllDecorator().apply(args);
}
