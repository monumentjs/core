import {Type} from '@monument/core/main/Type';
import {Class} from '@monument/core/main/reflection/Class';
import {PortletCore} from '../PortletCore';
import {StringPool} from '@monument/core/main/StringPool';
import {PortletIdException} from '../PortletIdException';
import {PortletMappingDecorator} from '../configuration/decorator/PortletMappingDecorator';
import {PortletMappingConfiguration} from '../configuration/decorator/PortletMappingConfiguration';


export class PortletDefinition {
    private readonly _configuration: PortletMappingConfiguration;
    private readonly _type: Type<PortletCore>;

    public get id(): string {
        return this._configuration.id;
    }

    public get type(): Type<PortletCore> {
        return this._type;
    }

    public constructor(type: Type<PortletCore>) {
        const klass: Class<PortletCore> = Class.of(type);
        const configuration: PortletMappingConfiguration | undefined = klass.getAttribute(PortletMappingDecorator.CONFIGURATION);

        if (configuration == null) {
            throw new PortletIdException('Portlet ID cannot be null');
        }

        if (configuration.id === StringPool.BLANK) {
            throw new PortletIdException('Portlet ID cannot be empty string');
        }

        this._configuration = configuration;
        this._type = type;
    }
}
