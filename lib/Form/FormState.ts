import Store from '../Core/Store';
import {IJSONSerializable, AsyncResult} from '../Core/types';
import {IFormState, FormActionType, IFormAction} from './types';
import FieldController from './FieldState';
import {ActionListenerCancel} from '../Core/Dispatcher';
import {IValidationRule, IAsyncValidator} from '../Data/Validation/types';
import ValidationError from '../Data/Validation/ValidationError';


export default class FormState<M>
    extends Store<IFormState, IFormAction> 
    implements IAsyncValidator<boolean>, IJSONSerializable<M> {
    
    private _fields: FieldController[] = [];
    private _subscriptions: {[id: number]: ActionListenerCancel} = Object.create(null);


    get fields(): FieldController[] {
        return this._fields;
    }


    constructor() {
        super({
            submitted: false,
            dirty: false,
            touched: false,
            invalid: false,
            errors: []
        });

        this.initialize();
    }


    public addField(field: FieldController) {
        this._fields.push(field);
        this.startListenToFieldChanges(field);
    }


    public removeField(field: FieldController) {
        let index: number = this._fields.indexOf(field);

        this._fields.splice(index, 1);
        this.stopListenToFieldChanges(field);
    }


    public validate(): AsyncResult<boolean> {
        let model: M = this.toJSON();
        let formErrors: ValidationError[] = [];

        return Promise.all(this._fields.map((field: FieldController) => {
            return Promise.all(field.rules.map((rule: IValidationRule<any>) => {
                return rule.validate(model, field.name).then((fieldErrors: ValidationError[]) => {
                    formErrors.push(...fieldErrors);
                    field.setValidity(fieldErrors);
                });
            }));
        })).then(() => {
            return formErrors.length === 0;
        });
    }


    public reset() {
        this.dispatch({
            type: FormActionType.Reset
        });

        this.validate();
    }


    public submit() {
        this.dispatch({
            type: FormActionType.Submitted
        });
    }


    public setValidity(errors: ValidationError[]) {
        this.dispatch({
            type: FormActionType.Validated,
            errors: errors
        });
    }


    public toJSON(): M {
        // TODO: Add support of nested properties
        let data: any = {};

        for (let field of this._fields) {
            data[field.name] = field.value;
        }

        return data;
    }


    protected initialize() {
        this.addReducers((state: IFormState, action: IFormAction): IFormState => {
            switch (action.type) {
                case FormActionType.Reset:
                    return {
                        submitted: false,
                        dirty: false,
                        touched: false,
                        invalid: false,
                        errors: []
                    };

                case FormActionType.Submitted:
                    state.submitted = true;
                    break;

                case FormActionType.Changed:
                    state.dirty = true;
                    state.touched = true;
                    break;

                case FormActionType.Validated:
                    state.errors = action.errors;
                    break;
            }

            return state;
        });
    }


    protected refreshState() {
        this.dispatch({
            type: FormActionType.Changed
        });
    }


    protected startListenToFieldChanges(field: FieldController) {
        let cancel: ActionListenerCancel;

        cancel = field.subscribe(function () {
            this.refreshState();
        });

        this._subscriptions[field.id] = cancel;
    }


    protected stopListenToFieldChanges(field: FieldController) {
        let cancel: ActionListenerCancel = this._subscriptions[field.id];

        cancel();
        delete this._subscriptions[field.id];
    }
}