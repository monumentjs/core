import {Type} from '../Type';
import {Key} from '../object-model/attributes/Key';
import {Class} from '../reflection/Class';
import {ConfigurationDecorator} from './ConfigurationDecorator';


export class ApplicationDecorator extends ConfigurationDecorator {
    public static readonly MODULES: Key<Array<Type<object>>> = new Key('Application modules');


    private readonly _modules: Array<Type<object>>;


    public constructor(modules: Array<Type<object>>) {
        super();

        this._modules = modules;
    }


    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(ApplicationDecorator);
        klass.setAttribute(ApplicationDecorator.MODULES, this._modules);
    }
}
