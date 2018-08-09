import {Class} from '../reflection/Class';
import {Method} from '../reflection/Method';
import {SingletonDecorator} from './SingletonDecorator';


export class ComponentDecorator extends SingletonDecorator {

    protected onClass(klass: Class<any>): void {
        super.onClass(klass);
        klass.decorate(ComponentDecorator);
    }


    protected onMethod(klass: Class<any>, method: Method): void {
        method.decorate(ComponentDecorator);
    }
}
