import {Decorator} from '../../reflection/Decorator';
import {Class} from '../../reflection/Class';
import {Method} from '../../reflection/Method';
import {PreDestroy} from './PreDestroy';


export class PreDestroyDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(PreDestroy);
    }
}
