import ValidationError from '../Core/Data/Validation/ValidationError';
import {IAction} from '../Core/Dispatcher';
import {ValidationRules} from '../Core/Data/Validation/types';


export interface IModelState {
    dirty: boolean;
    touched: boolean;
    invalid: boolean;
    errors: ValidationError[];
}


// Form


export interface IFormState extends IModelState {
    submitted: boolean;
}


export enum FormActionType {
    Submitted, Reset, Validated, Changed, Touched
}


export interface IFormAction extends IAction {
    type: FormActionType;
    errors?: ValidationError[]
}


// Field


export interface IFieldProps {
    name: string;
    rules: ValidationRules;
}


export interface IFieldState extends IModelState {
    value: any;
}


export enum FieldActionType {
    Touched, Changed, Validated
}


export interface IFieldAction extends IAction {
    type: FieldActionType;
    value?: any;
    errors?: ValidationError[];
}


