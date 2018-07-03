import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Class} from '@monument/core/main/reflection/Class';
import {Method} from '@monument/core/main/reflection/Method';
import {ProcessActionHandler} from './ProcessActionHandler';


export class ProcessActionHandlerDecorator extends Decorator {

    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(ProcessActionHandler);
    }
}
