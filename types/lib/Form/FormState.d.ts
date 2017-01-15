import Store from '../Core/Store';
import { IJSONSerializable, AsyncResult } from '../Core/types';
import { IFormState, IFormAction } from './types';
import FieldController from './FieldState';
import { IAsyncValidator } from '../Data/Validation/types';
import ValidationError from '../Data/Validation/ValidationError';
export default class FormState<M> extends Store<IFormState, IFormAction> implements IAsyncValidator<boolean>, IJSONSerializable<M> {
    private _fields;
    private _subscriptions;
    readonly fields: FieldController[];
    constructor();
    addField(field: FieldController): void;
    removeField(field: FieldController): void;
    validate(): AsyncResult<boolean>;
    reset(): void;
    submit(): void;
    setValidity(errors: ValidationError[]): void;
    toJSON(): M;
    protected initialize(): void;
    protected refreshState(): void;
    protected startListenToFieldChanges(field: FieldController): void;
    protected stopListenToFieldChanges(field: FieldController): void;
}
