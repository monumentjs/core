import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/reflection/main/Class';
import {Key} from '@monument/object-model/main/attributes/Key';
import {ConfigurationDecorator} from './ConfigurationDecorator';
import {Module} from './Module';


export class ModuleDecorator extends ConfigurationDecorator {
    public static readonly COMPONENTS: Key<Array<Type<object>>> = new Key();

    private readonly _components: Array<Type<object>>;


    public constructor(components: Array<Type<object>>) {
        super();

        this._components = components;
    }


    protected onClass(klass: Class<any>): void {
        super.onClass(klass);

        klass.decorate(Module);
        klass.setAttribute(ModuleDecorator.COMPONENTS, this._components);
    }
}
