import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Controller} from './Controller';


export class ControllerDecorator extends Decorator {

    protected onClass(klass: Class<any>): void {
        klass.decorate(Controller);
    }
}
