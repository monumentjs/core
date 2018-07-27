import {Component} from '@monument/core/main/stereotype/Component';
import {PortletContainerBase} from './PortletContainerBase';
import {DefaultPortletDefinitionRegistry} from '../../definition/registry/support/DefaultPortletDefinitionRegistry';


@Component
export class DefaultPortletContainer extends PortletContainerBase {

    public constructor(registry: DefaultPortletDefinitionRegistry) {
        super(registry);
    }
}
