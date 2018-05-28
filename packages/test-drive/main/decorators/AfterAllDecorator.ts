import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {AfterAll} from './AfterAll';


export class AfterAllDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(AfterAll);
    }
}
