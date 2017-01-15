import ValidationError from '../Data/Validation/ValidationError';
import { IAction } from '../Core/Dispatcher';
import { ValidationRules } from '../Data/Validation/types';
export interface IModelState {
    dirty: boolean;
    touched: boolean;
    invalid: boolean;
    errors: ValidationError[];
}
export interface IFormState extends IModelState {
    submitted: boolean;
}
export declare enum FormActionType {
    Submitted = 0,
    Reset = 1,
    Validated = 2,
    Changed = 3,
    Touched = 4,
}
export interface IFormAction extends IAction {
    type: FormActionType;
    errors?: ValidationError[];
}
export interface IFieldProps {
    name: string;
    rules: ValidationRules;
}
export interface IFieldState extends IModelState {
    value: any;
}
export declare enum FieldActionType {
    Touched = 0,
    Changed = 1,
    Validated = 2,
}
export interface IFieldAction extends IAction {
    type: FieldActionType;
    value?: any;
    errors?: ValidationError[];
}
