import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {ApplicationContext} from '../context/ApplicationContext';


export class BootDecorator extends Decorator {
    protected onClass(klass: Class<any>): void {
        const context: ApplicationContext = new ApplicationContext();

        context.scan(klass.type);

        context.start();
    }
}
