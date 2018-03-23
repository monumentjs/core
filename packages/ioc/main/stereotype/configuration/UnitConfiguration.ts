import {Type} from '@monument/core/main/Type';
import {Key} from '@monument/object-model/main/Key';


export class UnitConfiguration {
    public static readonly ATTRIBUTE_KEY: Key<UnitConfiguration> = new Key();

    public readonly type: Type<object>;


    public constructor(type: Type<object>) {
        this.type = type;
    }
}
