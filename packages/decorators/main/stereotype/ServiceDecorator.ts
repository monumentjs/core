import {Class} from '@monument/reflection/main/Class';
import {Service} from './Service';
import {ComponentDecorator} from './ComponentDecorator';


export class ServiceDecorator extends ComponentDecorator {

    protected onClass(klass: Class<any>): void {
        super.onClass(klass);
        klass.decorate(Service);
    }
}
