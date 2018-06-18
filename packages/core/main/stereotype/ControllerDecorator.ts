import {Controller} from './Controller';
import {Decorator} from '../reflection/Decorator';
import {Class} from '../reflection/Class';


export class ControllerDecorator extends Decorator {

    protected onClass(klass: Class<any>): void {
        klass.decorate(Controller);
    }
}
