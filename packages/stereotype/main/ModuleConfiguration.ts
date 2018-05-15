import {Type} from '@monument/core/main/Type';
import {ListSet} from '@monument/collections/main/ListSet';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {Key} from '@monument/object-model/main/attributes/Key';


export class ModuleConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<ModuleConfiguration> = new Key();

    private readonly _components: ListSet<Type<object>>;


    public get components(): ReadOnlySet<Type<object>> {
        return this._components;
    }


    public constructor(components?: Iterable<Type<object>>) {
        this._components = new ListSet(components);
    }
}
