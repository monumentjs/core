import {Init} from './Init';
import {Decorator} from '../../reflection/Decorator';
import {Class} from '../../reflection/Class';
import {Method} from '../../reflection/Method';


export class InitDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(Init);
    }
}
