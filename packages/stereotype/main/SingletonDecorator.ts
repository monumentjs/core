import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {Singleton} from './Singleton';


export class SingletonDecorator extends Decorator {

    protected onClass(klass: Class<any>): void {
        klass.decorate(Singleton);
    }
}
