import {Key} from '@monument/object-model/main/Key';
import {Type} from '@monument/core/main/Type';


export class DefaultTypeConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<DefaultTypeConfiguration> = new Key();

    private readonly _defaultType: Type<object>;

    public get defaultType(): Type<object> {
        return this._defaultType;
    }


    public constructor(defaultType: Type<object>) {
        this._defaultType = defaultType;
    }
}
