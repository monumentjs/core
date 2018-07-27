import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Class} from '@monument/core/main/reflection/Class';
import {Type} from '@monument/core/main/Type';
import {Key} from '@monument/core/main/object-model/attributes/Key';
import {List} from '@monument/core/main/collection/mutable/List';
import {BindingConfiguration} from '../BindingConfiguration';
import {ArrayList} from '@monument/core/main/collection/mutable/ArrayList';
import {BindingDefinition} from '../BindingDefinition';


export class BindingDecorator<T> extends Decorator {
    public static readonly DEFINITIONS: Key<List<BindingDefinition<any>>> = new Key();

    private readonly _configuration: BindingConfiguration<T>;


    public constructor(configuration: BindingConfiguration<T>) {
        super();
        this._configuration = configuration;
    }


    protected onProperty(klass: Class<any>, key: string | symbol, type: Type<any> | undefined): void {
        this.addBinding(klass, key);
    }


    private addBinding(klass: Class<any>, key: string | symbol): void {
        let bindings: List<BindingDefinition<T>> | undefined = klass.getDeclaredAttribute(BindingDecorator.DEFINITIONS);

        if (bindings == null) {
            bindings = new ArrayList();

            klass.setAttribute(BindingDecorator.DEFINITIONS, bindings);
        }

        bindings.add({
            ...this._configuration,
            key
        });
    }
}
