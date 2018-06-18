import {Destroy} from './Destroy';
import {Method} from '../../reflection/Method';
import {Class} from '../../reflection/Class';
import {Decorator} from '../../reflection/Decorator';


export class DestroyDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Destroy);
    }
}
