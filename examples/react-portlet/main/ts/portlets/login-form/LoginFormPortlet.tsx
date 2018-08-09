import * as React from 'react';
import {Singleton} from '@monument/core/main/stereotype/Singleton';
import {PortletMapping} from '@monument/react/main/portlet/configuration/decorator/PortletMapping';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {PortletBase} from '@monument/react/main/portlet/PortletBase';
import {Property} from '@monument/react/main/portlet/property/Property';
import {Delay} from '@monument/core/main/async/Delay';
import {Duration} from '@monument/core/main/time/Duration';
import {LoginFormView} from './LoginFormView';


@Singleton
@PortletMapping({
    id: 'LoginForm'
})
export class LoginFormPortlet extends PortletBase {
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
                submit={this.submit} />
        );
    }

    @Delegate
    private async submit(): Promise<void> {
        this._processing.set(true);

        await new Delay(new Duration(0, 0, 1)).wait();

        this._processing.set(false);
    }
}
