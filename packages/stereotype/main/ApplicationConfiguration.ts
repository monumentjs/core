import {Type} from '@monument/core/main/Type';
import {ListSet} from '@monument/collections/main/ListSet';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {Key} from '@monument/object-model/main/attributes/Key';


export class ApplicationConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<ApplicationConfiguration> = new Key();

    private _modules: ListSet<Type<object>> = new ListSet();
    private _components: ListSet<Type<object>> = new ListSet();


    public constructor(modules?: Iterable<Type<object>>, components?: Iterable<Type<object>>) {
        if (modules != null) {
            this._modules.addAll(modules);
        }

        if (components != null) {
            this._components.addAll(components);
        }
    }


    public get modules(): ReadOnlySet<Type<object>> {
        return this._modules;
    }


    public get components(): ReadOnlySet<Type<object>> {
        return this._components;
    }


    public addComponent(type: Type<object>) {
        this._components.add(type);
    }


    public addModule(type: Type<object>) {
        this._modules.add(type);
    }
}
