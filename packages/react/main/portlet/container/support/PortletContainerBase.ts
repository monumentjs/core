import {Context} from '@monument/core/main/context/Context';
import {PortletDefinitionRegistry} from '../../definition/registry/PortletDefinitionRegistry';
import {DefaultContext} from '@monument/core/main/context/support/DefaultContext';
import {PortletCore} from '../../PortletCore';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';
import {PortletDefinition} from '../../definition/PortletDefinition';
import {PortletContainer} from '../PortletContainer';
import {ContextAware} from '@monument/core/main/context/configuration/ContextAware';


export class PortletContainerBase implements PortletContainer, ContextAware {
    private readonly _registry: PortletDefinitionRegistry;
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

    public async getPortlet(id: string): Promise<PortletCore> {
        const definition: PortletDefinition = this._registry.getPortletDefinition(id);
        const context: DefaultContext = new DefaultContext(this._context);

        context.scan(definition.type);

        await context.initialize();
        await context.start();

        const portlet: PortletCore = await context.getUnit(definition.type);

        portlet.portletDestroyed.subscribe(async () => {
            await context.stop();
        });

        return portlet;
    }
}
