import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Field} from '@monument/core/main/reflection/Field';
import {Class} from '@monument/core/main/reflection/Class';
import {Type} from '@monument/core/main/Type';
import {Key} from '@monument/core/main/object-model/attributes/Key';
import {List} from '@monument/core/main/collections/List';
import {BindingConfiguration} from '../BindingConfiguration';
import {ArrayList} from '@monument/core/main/collections/ArrayList';


export class BindingDecorator extends Decorator {
    public static readonly BINDINGS: Key<List<BindingConfiguration>> = new Key();

    private readonly _configuration: BindingConfiguration;


    public constructor(configuration: BindingConfiguration) {
        super();
        this._configuration = configuration;
    }


    protected onField(klass: Class<any>, field: Field): void {
        this.addBinding(klass, field.name);
    }


    protected onProperty(klass: Class<any>, key: string | symbol, type: Type<any> | undefined): void {
        this.addBinding(klass, key);
    }


    private addBinding(klass: Class<any>, key: string | symbol): void {
        let bindings: List<BindingConfiguration> | undefined = klass.getAttribute(BindingDecorator.BINDINGS);

        if (bindings == null) {
            bindings = new ArrayList();

            klass.setAttribute(BindingDecorator.BINDINGS, bindings);
        }

        bindings.add(this._configuration);
    }
}
