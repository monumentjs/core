import {Class} from '@monument/reflection/main/Class';
import {Decorator} from '@monument/reflection/main/Decorator';
import {Method} from '@monument/reflection/main/Method';


class BeforeAllDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(BeforeAll);
    }
}


export function BeforeAll(...args: any[]) {
    new BeforeAllDecorator().apply(args);
}
