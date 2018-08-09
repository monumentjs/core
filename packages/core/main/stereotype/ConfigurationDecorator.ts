import {Class} from '../reflection/Class';
import {ComponentDecorator} from './ComponentDecorator';


export class ConfigurationDecorator extends ComponentDecorator {

    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(ConfigurationDecorator);
    }
}
