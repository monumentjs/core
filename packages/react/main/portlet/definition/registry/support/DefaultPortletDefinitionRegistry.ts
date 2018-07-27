import {ConfigurablePortletDefinitionRegistry} from '../ConfigurablePortletDefinitionRegistry';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';
import {PortletDefinition} from '../../PortletDefinition';
import {ListMap} from '@monument/core/main/collection/mutable/ListMap';
import {StringPool} from '@monument/core/main/StringPool';
import {PortletIdException} from '../../../PortletIdException';
import {DuplicatePortletIdException} from '../DuplicatePortletIdException';
import {NoSuchPortletDefinitionException} from '../NoSuchPortletDefinitionException';
import {Component} from '@monument/core/main/stereotype/Component';


@Component
export class DefaultPortletDefinitionRegistry implements ConfigurablePortletDefinitionRegistry {
    private readonly _definitions: ListMap<string, PortletDefinition> = new ListMap();

    public get portletIds(): ReadOnlySet<string> {
        return this._definitions.keys;
    }

    public addPortletDefinition(id: string, definition: PortletDefinition): void {
        if (id === StringPool.BLANK) {
            throw new PortletIdException('Portlet ID cannot be empty string');
        }

        if (this._definitions.containsKey(id)) {
            throw new DuplicatePortletIdException(`Portlet definition with ID="${id}" already registered in this registry`);
        }

        this._definitions.put(id, definition);
    }

    public getPortletDefinition(id: string): PortletDefinition {
        const definition: PortletDefinition | undefined = this._definitions.get(id);

        if (definition == null) {
            throw new NoSuchPortletDefinitionException(`Portlet definition with ID="${id}" not registered in this registry`);
        }

        return definition;
    }
}
