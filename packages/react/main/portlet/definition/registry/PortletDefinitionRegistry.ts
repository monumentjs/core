import {PortletDefinition} from '../PortletDefinition';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';


export interface PortletDefinitionRegistry {
    readonly portletIds: ReadOnlySet<string>;

    getPortletDefinition(id: string): PortletDefinition;
}
