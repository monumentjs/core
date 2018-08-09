import {Decorator} from '@monument/core/main/reflection/Decorator';
import {Class} from '@monument/core/main/reflection/Class';
import {Key} from '@monument/core/main/object-model/attributes/Key';
import {PortletMappingConfiguration} from './PortletMappingConfiguration';


export class PortletMappingDecorator extends Decorator {
    public static readonly CONFIGURATION: Key<PortletMappingConfiguration> = new Key('Portlet mapping configuration');

    private readonly _configuration: PortletMappingConfiguration;

    public constructor(configuration: PortletMappingConfiguration) {
        super();
        this._configuration = configuration;
    }

    protected onClass(klass: Class<object>): void {
        klass.setAttribute(PortletMappingDecorator.CONFIGURATION, this._configuration);
    }
}
