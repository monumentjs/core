import {Type} from '@monument/core/main/Type';
import {Key} from '@monument/object-model/main/Key';


export class DefaultTypeConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<DefaultTypeConfiguration> = new Key();

    public readonly defaultType: Type<object>;


    public constructor(defaultType: Type<object>) {
        this.defaultType = defaultType;
    }
}
