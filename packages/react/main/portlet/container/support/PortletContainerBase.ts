import {Context} from '@monument/core/main/context/Context';
import {PortletDefinitionRegistry} from '../../definition/registry/PortletDefinitionRegistry';
import {DefaultContext} from '@monument/core/main/context/support/DefaultContext';
import {PortletCore} from '../../PortletCore';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';
import {PortletDefinition} from '../../definition/PortletDefinition';
import {PortletContainer} from '../PortletContainer';
import {ContextAware} from '@monument/core/main/context/configuration/ContextAware';
import {ListMap} from '@monument/core/main/collection/mutable/ListMap';
import {NoSuchPortletDefinitionException} from '../../definition/registry/NoSuchPortletDefinitionException';


export class PortletContainerBase implements PortletContainer, ContextAware {
    private readonly _registry: PortletDefinitionRegistry;
    private readonly _contexts: ListMap<string, DefaultContext> = new ListMap();
    private _context: Context | undefined;

    public get portletIds(): ReadOnlySet<string> {
        return this._registry.portletIds;
    }

    public constructor(registry: PortletDefinitionRegistry) {
        this._registry = registry;
    }

    public [ContextAware.setContext](context: Context): void {
        this._context = context;
    }

    public async initialize(): Promise<void> {
        for (const id of this._registry.portletIds) {
            const definition = this._registry.getPortletDefinition(id);
            const context = new DefaultContext(this._context);

            context.scan(definition.type);

            await context.initialize();
            await context.start();

            this._contexts.put(id, context);
        }
    }

    public async getPortlet(id: string): Promise<PortletCore> {
        const definition: PortletDefinition = this._registry.getPortletDefinition(id);
        let context: DefaultContext | undefined = this._contexts.get(id);

        if (context == null) {
            throw new NoSuchPortletDefinitionException(`Context for portlet with ID=${id} is not found.`);
        }

        return context.getUnit(definition.type);
    }
}
