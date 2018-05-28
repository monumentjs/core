import {Type} from '@monument/core/main/Type';
import {Key} from '@monument/object-model/main/attributes/Key';
import {Class} from '@monument/reflection/main/Class';
import {ConfigurationDecorator} from './ConfigurationDecorator';
import {Application} from './Application';


export class ApplicationDecorator extends ConfigurationDecorator {
    public static readonly MODULES: Key<Array<Type<object>>> = new Key();


    private readonly _modules: Array<Type<object>>;


    public constructor(modules: Array<Type<object>>) {
        super();

        this._modules = modules;
    }


    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(Application);
        klass.setAttribute(ApplicationDecorator.MODULES, this._modules);
    }
}
