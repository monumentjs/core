import {Type} from '@monument/core/main/Type';
import {ListSet} from '@monument/collections/main/ListSet';
import {ReadOnlySet} from '@monument/collections-core/main/ReadOnlySet';
import {Key} from '@monument/object-model/main/Key';


export class ApplicationConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<ApplicationConfiguration> = new Key();

    private _imports: ListSet<Type<object>> = new ListSet();


    public get imports(): ReadOnlySet<Type<object>> {
        return this._imports;
    }


    public constructor(imports?: Iterable<Type<object>>) {
        if (imports != null) {
            this._imports.addAll(imports);
        }
    }
}
