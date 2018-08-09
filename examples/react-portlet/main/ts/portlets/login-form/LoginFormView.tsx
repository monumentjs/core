import * as React from 'react';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {LoginFormProps} from './LoginFormProps';


export class LoginFormView extends React.Component<LoginFormProps> {
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
