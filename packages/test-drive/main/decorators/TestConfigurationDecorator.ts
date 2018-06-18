import {TestConfiguration} from './TestConfiguration';
import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Type} from '@monument/core/main/Type';
import {Key} from '@monument/core/main/object-model/attributes/Key';
import {Class} from '@monument/core/main/reflection/Class';


export class TestConfigurationDecorator extends Decorator {
    public static readonly COMPONENTS: Key<Array<Type<object>>> = new Key();
    public static readonly MODULES: Key<Array<Type<object>>> = new Key();

    private readonly _components: Array<Type<object>>;
    private readonly _modules: Array<Type<object>>;


    public constructor(components: Array<Type<object>>, modules: Array<Type<object>>) {
        super();

        this._components = components;
        this._modules = modules;
    }


    protected onClass(klass: Class<any>): void {
        klass.decorate(TestConfiguration);
        klass.setAttribute(TestConfigurationDecorator.COMPONENTS, this._components);
        klass.setAttribute(TestConfigurationDecorator.MODULES, this._modules);
    }
}
