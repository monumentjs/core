import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Method} from '@monument/reflection/main/Method';
import {Primary} from './Primary';


export class PrimaryDecorator extends Decorator {

    protected onClass(klass: Class<any>): void {
        klass.decorate(Primary);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Primary);
    }
}
