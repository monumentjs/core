import * as React from 'react';
import {render} from 'react-dom';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {PortletBase} from '@monument/react/main/portlet/PortletBase';
import {Duration} from '@monument/core/main/time/Duration';
import {Delay} from '@monument/core/main/async/Delay';
import {Property} from '@monument/react/main/portlet/property/Property';
import {Portlet} from '@monument/react/main/components/Portlet';
import {DefaultPortletContainer} from '@monument/react/main/portlet/container/support/DefaultPortletContainer';
import {DefaultPortletDefinitionRegistry} from '@monument/react/main/portlet/definition/registry/support/DefaultPortletDefinitionRegistry';
import {PortletDefinition} from '@monument/react/main/portlet/definition/PortletDefinition';
import {Portal} from '@monument/react/main/components/Portal';
import {PortletMapping} from '@monument/react/main/portlet/configuration/decorator/PortletMapping';
import {Singleton} from '@monument/core/main/stereotype/Singleton';


interface LoginFormProps {
    readonly email: string;
    readonly password: string;

    readonly processing: boolean;

    setEmail(value: string): void;

    setPassword(value: string): void;

    submit(): void;
}


class LoginFormView extends React.Component<LoginFormProps> {
    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="email"
                       name="email"
                       onChange={this.onEmailChange}
                       value={this.props.email}
                       disabled={this.props.processing}/>
                <input type="password"
                       name="password"
                       onChange={this.onPasswordChange}
                       value={this.props.password}
                       disabled={this.props.processing}/>
                <button disabled={this.props.processing}>Submit</button>
            </form>
        );
    }

    @Delegate
    private onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.setEmail(event.target.value);
    }

    @Delegate
    private onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.setPassword(event.target.value);
    }

    @Delegate
    private onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.props.submit();
    }
}


@PortletMapping({
    id: 'LoginForm'
})
@Singleton
class LoginFormPortlet extends PortletBase {
    private readonly _email: Property<string> = this.getProperty('alex@drivelog.de');
    private readonly _password: Property<string> = this.getProperty('SuperAlex');
    private readonly _processing: Property<boolean> = this.getProperty(false);

    public render() {
        return (
            <LoginFormView
                email={this._email.get()}
                password={this._password.get()}
                processing={this._processing.get()}
                setEmail={this._email.set}
                setPassword={this._password.set}
                submit={this.submit}/>
        );
    }

    @Delegate
    private async submit(): Promise<void> {
        this._processing.set(true);

        // Simulate AJAX request
        await new Delay(new Duration(0, 0, 2)).wait();

        this._processing.set(false);
    }
}


(async () => {
    const portletDefinitionRegistry = new DefaultPortletDefinitionRegistry();
    portletDefinitionRegistry.addPortletDefinition(new PortletDefinition(LoginFormPortlet));

    const portletContainer = new DefaultPortletContainer(portletDefinitionRegistry);

    await portletContainer.initialize();

    render(
        <Portal portletContainer={portletContainer}>
            <Portlet id="LoginForm"/>
            <hr/>
            <Portlet id="LoginForm"/>
        </Portal>,
        document.querySelector('#app')
    );
})();
