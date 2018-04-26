import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Lazy} from './Lazy';


export class LazyDecorator extends Decorator {

    protected onClass(klass: Class<any>): void {
        klass.decorate(Lazy);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Lazy);
    }
}
