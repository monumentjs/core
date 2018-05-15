import {Class} from '@monument/reflection/main/Class';
import {Decorator} from '@monument/reflection/main/Decorator';
import {Method} from '@monument/reflection/main/Method';


class TestDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Test);
    }
}


export function Test(...args: any[]) {
    new TestDecorator().apply(args);
}
