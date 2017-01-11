import * as React from 'react';
import {ValidationRules} from '../../../../Core/Data/Validation/types';
import {Pool, Constructor} from '../../../../Core/types';
import UIComponent, {IUIComponentProps} from '../UIComponent/UIComponent';
import FormState from '../../../../Form/FormState';
import ClassList from '../../../../UI/CSS/ClassList';


export interface IUIFormProps extends IUIComponentProps {
    controllerType?: Constructor;
    rules?: Pool<ValidationRules>;
}


export interface IUIFormState {
    touched: boolean;
    dirty: boolean;
    submitted: boolean;
    invalid: boolean;
}


export class UIForm extends UIComponent<IUIFormProps, Partial<IUIFormState>> {
    private _controller: FormState;


    static get childContextTypes() {
        return {
            FormState: React.PropTypes.instanceOf(FormState)
        };
    }
    
    
    static get defaultProps(): IUIFormProps {
        return {
            controllerType: FormState
        };
    }


    constructor(props?: IUIFormProps) {
        super(props);

        this._controller = new this.props.controllerType();

        this.state = this._controller.state;
    }


    public componentDidMount() {
        this._controller.subscribe((state: IUIFormState) => {
            this.setState(state);
        });

        this._controller.validate();
    }


    public componentWillUnmount() {
        this._controller.destroy();
    }


    public getChildContext() {
        return {
            FormState: this._controller
        };
    }


    public render(): React.ReactNode {
        let {touched, dirty, submitted, invalid} = this.state;

        let classNames = ClassList.concat({
            'ui-form': true,
            'is-touched': touched,
            'is-dirty': dirty,
            'is-submitted': submitted,
            'is-invalid': invalid
        }, this.props.className).toString();

        return (
            <form {...this.props}
                className={classNames}
                id={this._controller.formID}
                onSubmit={this.onSubmit()}
                onReset={this.onReset()}
                role="form">
                { this.renderBody() }
            </form>
        );
    }


    protected renderBody(): React.ReactNode {
        return this.props.children;
    }


    protected onReset(): React.FormEventHandler {
        return (event: React.FormEvent) => {
            this._controller.reset();
            this.invoke('onReset', event);
        };
    }


    protected onSubmit(): React.FormEventHandler {
        return (event: React.FormEvent) => {
            this._controller.submit();
            this.invoke('onSubmit', event, this._controller);
        };
    }
}
