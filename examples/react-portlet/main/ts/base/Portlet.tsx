import * as React from 'react';
import {render} from 'react-dom';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Binding} from '@monument/react/main/binding/configuration/decorators/Binding';
import {Class} from '@monument/core/main/reflection/Class';
import {BindingDecorator} from '@monument/react/main/binding/configuration/decorators/BindingDecorator';
import {List} from '@monument/core/main/collections/List';
import {BindingDefinition} from '@monument/react/main/binding/configuration/BindingDefinition';
import {ReadOnlyCollection} from '@monument/core/main/collections/ReadOnlyCollection';


export interface PortletController<TModel> {
    getModel(): TModel;
    onComponentMounted?(): void;
    onComponentUnmounted?(): void;
    onComponentUpdated?(): void;
}


export interface PortletProps<TModel, TController extends PortletController<TModel>> {
    readonly view: React.ComponentType<TModel>;
    readonly controller: TController;
}


export class Portlet<TModel, TController extends PortletController<TModel>> extends React.Component<PortletProps<TModel, TController>> {
    private readonly _controller: TController;
    private readonly _view: React.ComponentType<TModel>;

    public constructor(props: PortletProps<TModel, TController>) {
        super(props);

        this.state = {};

        this._controller = props.controller;
        this._view = props.view;

        const self = this;
        const klass: Class<TController> = Class.of(props.controller.constructor);
        const bindingLists: ReadOnlyCollection<List<BindingDefinition<any>>> = klass.getAttributeValues(BindingDecorator.DEFINITIONS);

        console.log(bindingLists);

        for (const bindingList of bindingLists) {
            for (const {key, comparator} of bindingList) {
                console.log(key, props.controller);

                const valueKey: symbol = Symbol();

                Object.defineProperty(props.controller, key, {
                    get(this: any) {
                        return this[valueKey];
                    },
                    set(this: any, value: any) {
                        this[valueKey] = value;

                        self.setState({
                            [key]: value
                        });
                    }
                });
            }
        }
    }

    public render() {
        const model: TModel = this._controller.getModel();
        /* tslint:disable:variable-name */
        const View: React.ComponentType<TModel> = this._view;

        return <View {...model}>{this.props.children}</View>;
    }
}


// ------------------------------


interface LoginResponse {
    readonly success: boolean;
}

interface LoginService<TCredentials> {
    login(credentials: TCredentials): Promise<LoginResponse>;
}

// ------------------------------

interface DefaultLoginCredentials {
    readonly email: string;
    readonly password: string;
}

/**
 * @final
 */
class DefaultLoginService implements LoginService<DefaultLoginCredentials> {
    public async login(credentials: DefaultLoginCredentials): Promise<LoginResponse> {
        return {
            success: true
        };
    }
}

// ------------------------------


interface LoginFormModel {
    readonly email: string;
    readonly password: string;

    setEmail(email: string): void;
    setPassword(password: string): void;

    submit(): void;
}


abstract class LoginFormController implements PortletController<LoginFormModel> {
    private _auth: LoginService<DefaultLoginCredentials>;

    @Binding()
    private _email: string = '';

    @Binding()
    private _password: string = '';

    protected constructor(loginService: LoginService<DefaultLoginCredentials>) {
        this._auth = loginService;
    }

    public getModel(): LoginFormModel {
        return {
            email: this._email,
            password: this._password,
            setEmail: this.setEmail,
            setPassword: this.setPassword,
            submit: this.submit
        };
    }

    @Delegate
    public setEmail(value: string): void {
        console.log('set email', value);
        this._email = value;
    }

    @Delegate
    public setPassword(value: string): void {
        console.log('set password', value);
        this._password = value;
    }

    @Delegate
    public submit(): void {
        //
    }
}


class DefaultLoginFormController extends LoginFormController {
    public constructor(loginService: DefaultLoginService) {
        super(loginService);
    }
}


class LoginFormView extends React.Component<LoginFormModel> {
    public render(): JSX.Element {
        return (
            <form className="LoginForm" onSubmit={this.onSubmit}>
                <input type="email" value={this.props.email} onChange={this.onEmailChange}/>
                <br/>
                <input type="password" value={this.props.password} onChange={this.onPasswordChange}/>
                <br/>
                <button>Login</button>
            </form>
        );
    }

    @Delegate
    private onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        this.props.submit();
    }

    @Delegate
    private onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('on email change', event.currentTarget.value);
        this.props.setEmail(event.currentTarget.value);
    }

    @Delegate
    private onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('on password change', event.currentTarget.value);
        this.props.setPassword(event.currentTarget.value);
    }
}

(() => {
    const loginService: DefaultLoginService = new DefaultLoginService();
    const controller: DefaultLoginFormController = new DefaultLoginFormController(loginService);

    render(
        <Portlet controller={controller} view={LoginFormView} />,
        document.querySelector('#app')
    );

})();
