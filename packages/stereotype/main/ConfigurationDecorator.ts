import {Class} from '@monument/reflection/main/Class';
import {Configuration} from './Configuration';
import {ComponentDecorator} from './ComponentDecorator';


export class ConfigurationDecorator extends ComponentDecorator {

    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(Configuration);
    }
}
