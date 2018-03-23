import {Type} from '@monument/core/main/Type';
import {ListSet} from '@monument/collections/main/ListSet';
import {ReadOnlySet} from '@monument/collections-core/main/ReadOnlySet';
import {Key} from '@monument/object-model/main/Key';


export class ModuleConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<ModuleConfiguration> = new Key();

    private _imports: ListSet<Type<object>> = new ListSet();
    private _exports: ListSet<Type<object>> = new ListSet();


    public get imports(): ReadOnlySet<Type<object>> {
        return this._imports;
    }


    public get exports(): ReadOnlySet<Type<object>> {
        return this._exports;
    }


    public constructor(imports?: Iterable<Type<object>>, exports?: Iterable<Type<object>>) {
        if (imports != null) {
            this._imports.addAll(imports);
        }

        if (exports != null) {
            this._exports.addAll(exports);
        }
    }
}
