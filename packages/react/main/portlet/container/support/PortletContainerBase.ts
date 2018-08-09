import {PortletDefinitionRegistry} from '../../definition/registry/PortletDefinitionRegistry';
import {PortletCore} from '../../PortletCore';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';
import {PortletDefinition} from '../../definition/PortletDefinition';
import {PortletContainer} from '../PortletContainer';
import {DefaultContext} from '@monument/core/main/context/support/DefaultContext';
import {ContextAware} from '@monument/core/main/context/configuration/ContextAware';
import {ListMap} from '@monument/core/main/collection/mutable/ListMap';
import {NoSuchPortletDefinitionException} from '../../definition/registry/NoSuchPortletDefinitionException';


export class PortletContainerBase implements PortletContainer {
    private readonly _registry: PortletDefinitionRegistry;
    private readonly _context: DefaultContext = new DefaultContext();

    public get portletIds(): ReadOnlySet<string> {
        return this._registry.portletIds;
    }

    public constructor(registry: PortletDefinitionRegistry) {
        this._registry = registry;

        for (const id of registry.portletIds) {
            const definition = registry.getPortletDefinition(id);

            this._context.scan(definition.type);
        }
    }


    public async initialize() {
        await this._context.initialize();
        await this._context.start();
    }


    public async getPortlet(id: string): Promise<PortletCore> {
        const definition: PortletDefinition = this._registry.getPortletDefinition(id);

        return this._context.getUnit(definition.type);
    }
}
