import {PortletContainerBase} from './PortletContainerBase';
import {DefaultPortletDefinitionRegistry} from '../../definition/registry/support/DefaultPortletDefinitionRegistry';

export class DefaultPortletContainer extends PortletContainerBase {

    public constructor(registry: DefaultPortletDefinitionRegistry) {
        super(registry);
    }
}
