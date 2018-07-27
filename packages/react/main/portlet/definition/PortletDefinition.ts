import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/core/main/reflection/Class';
import {PortletCore} from '../PortletCore';


export class PortletDefinition {
    public readonly id: string;
    public readonly type: Type<PortletCore>;

    public constructor(type: Type<PortletCore>) {
        const klass: Class<PortletCore> = Class.of(type);


        this.type = type;
    }
}
