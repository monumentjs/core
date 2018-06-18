import {Primary} from './Primary';
import {Decorator} from '../../reflection/Decorator';
import {Class} from '../../reflection/Class';
import {Method} from '../../reflection/Method';


export class PrimaryDecorator extends Decorator {

    protected onClass(klass: Class<any>): void {
        klass.decorate(Primary);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Primary);
    }
}
