import {Decorator} from '@monument/reflection/main/Decorator';
import {Class} from '@monument/reflection/main/Class';
import {TestConfiguration} from './TestConfiguration';
import {Type} from '@monument/core/main/Type';
import {Key} from '@monument/object-model/main/attributes/Key';


export class TestConfigurationDecorator extends Decorator {
    public static readonly COMPONENTS: Key<Array<Type<object>>> = new Key();

    private readonly _components: Array<Type<object>>;


    public constructor(components: Array<Type<object>>) {
        super();

        this._components = components;
    }


    protected onClass(klass: Class<any>): void {
        klass.decorate(TestConfiguration);
        klass.setAttribute(TestConfigurationDecorator.COMPONENTS, this._components);
    }
}
