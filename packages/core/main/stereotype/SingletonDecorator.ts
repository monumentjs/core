import {Key} from '../object-model/attributes/Key';
import {Class} from '../reflection/Class';
import {Decorator} from '../reflection/Decorator';


export class SingletonDecorator extends Decorator {
    public static readonly IS_SINGLETON: Key<boolean> = new Key('Singleton class');

    protected onClass(klass: Class<any>): void {
        klass.setAttribute(SingletonDecorator.IS_SINGLETON, true);
    }
}
