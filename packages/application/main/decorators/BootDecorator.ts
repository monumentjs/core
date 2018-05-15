import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {ApplicationContext} from '../context/ApplicationContext';


export class BootDecorator extends Decorator {
    protected async onClass(klass: Class<any>) {
        const context: ApplicationContext = new ApplicationContext();

        context.scan(klass.type);

        await context.initialize();
        await context.start();
    }
}
