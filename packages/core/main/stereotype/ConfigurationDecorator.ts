import {Configuration} from './Configuration';
import {ComponentDecorator} from './ComponentDecorator';
import {Class} from '../reflection/Class';


export class ConfigurationDecorator extends ComponentDecorator {

    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(Configuration);
    }
}
