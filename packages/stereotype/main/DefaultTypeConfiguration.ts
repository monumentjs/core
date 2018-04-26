import {Type} from '../../core/main/Type';
import {Key} from '../../object-model/main/attributes/Key';


export class DefaultTypeConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<DefaultTypeConfiguration> = new Key();

    public readonly defaultType: Type<object>;


    public constructor(defaultType: Type<object>) {
        this.defaultType = defaultType;
    }
}
