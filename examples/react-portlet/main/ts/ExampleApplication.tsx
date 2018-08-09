import * as React from 'react';
import {Boot} from '@monument/core/main/application/decorators/Boot';
import {Init} from '@monument/core/main/stereotype/lifecycle/Init';
import {DefaultPortletDefinitionRegistry} from '@monument/react/main/portlet/definition/registry/support/DefaultPortletDefinitionRegistry';
import {PortletDefinition} from '@monument/react/main/portlet/definition/PortletDefinition';
import {DefaultPortletContainer} from '@monument/react/main/portlet/container/support/DefaultPortletContainer';
import {LoginFormPortlet} from './portlets/login-form/LoginFormPortlet';
import {Component} from '@monument/core/main/stereotype/Component';

@Boot
@Component
export class ExampleApplication {

    @Init
    public async run() {
        const portletDefinitionRegistry = new DefaultPortletDefinitionRegistry();
        portletDefinitionRegistry.addPortletDefinition(new PortletDefinition(LoginFormPortlet));

        const portletContainer = new DefaultPortletContainer(portletDefinitionRegistry);

        await portletContainer.initialize();

        // render(
        //     <Portal portletContainer={portletContainer}>
        //         <Portlet id="LoginForm"/>
        //         <hr/>
        //         <Portlet id="LoginForm"/>
        //     </Portal>,
        //     document.querySelector('#app')
        // );
    }
}
