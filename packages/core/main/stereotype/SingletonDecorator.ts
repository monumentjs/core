import {Decorator} from '../reflection/Decorator';
import {Class} from '../reflection/Class';
import {Singleton} from './Singleton';


export class SingletonDecorator extends Decorator {

    protected onClass(klass: Class<any>): void {
        klass.decorate(Singleton);
    }
}
