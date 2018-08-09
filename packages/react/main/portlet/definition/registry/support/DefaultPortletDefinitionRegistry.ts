import {ConfigurablePortletDefinitionRegistry} from '../ConfigurablePortletDefinitionRegistry';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';
import {PortletDefinition} from '../../PortletDefinition';
import {ListMap} from '@monument/core/main/collection/mutable/ListMap';
import {DuplicatePortletIdException} from '../DuplicatePortletIdException';
import {NoSuchPortletDefinitionException} from '../NoSuchPortletDefinitionException';


export class DefaultPortletDefinitionRegistry implements ConfigurablePortletDefinitionRegistry {
    private readonly _definitions: ListMap<string, PortletDefinition> = new ListMap();

    public get portletIds(): ReadOnlySet<string> {
        return this._definitions.keys;
    }

    public addPortletDefinition(definition: PortletDefinition): void {
        if (this._definitions.containsKey(definition.id)) {
            throw new DuplicatePortletIdException(`Portlet definition with ID="${definition.id}" already registered in this registry`);
        }

        this._definitions.put(definition.id, definition);
    }

    public getPortletDefinition(id: string): PortletDefinition {
        const definition: PortletDefinition | undefined = this._definitions.get(id);

        if (definition == null) {
            throw new NoSuchPortletDefinitionException(`Portlet definition with ID="${id}" not registered in this registry`);
        }

        return definition;
    }
}
