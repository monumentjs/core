import {PortletDefinitionRegistry} from './PortletDefinitionRegistry';
import {PortletDefinition} from '../PortletDefinition';


export interface ConfigurablePortletDefinitionRegistry extends PortletDefinitionRegistry {
    /**
     * @throws {PortletIdException} if portlet with such ID already registered.
     * @throws {PortletDefinitionRegistryException} if portlet with such ID already registered.
     */
    addPortletDefinition(id: string, definition: PortletDefinition): void;
}
