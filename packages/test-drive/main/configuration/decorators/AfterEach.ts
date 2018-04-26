import {Class} from '@monument/reflection/main/Class';
import {Decorator} from '@monument/reflection/main/Decorator';
import {Method} from '@monument/reflection/main/Method';


class AfterEachDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(AfterEach);
    }
}


export function AfterEach(...args: any[]) {
    new AfterEachDecorator().apply(args);
}
