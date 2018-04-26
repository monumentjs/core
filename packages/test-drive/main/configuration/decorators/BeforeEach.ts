import {Class} from '@monument/reflection/main/Class';
import {Decorator} from '@monument/reflection/main/Decorator';
import {Method} from '@monument/reflection/main/Method';


class BeforeEachDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(BeforeEach);
    }
}


export function BeforeEach(...args: any[]) {
    new BeforeEachDecorator().apply(args);
}
