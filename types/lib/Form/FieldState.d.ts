import Store from '../Core/Store';
import { IFieldState, IFieldAction, IFieldProps } from './types';
import ValidationError from '../Data/Validation/ValidationError';
import { ValidationRules } from '../Data/Validation/types';
export default class FieldState extends Store<IFieldState, IFieldAction> {
    private _name;
    private _rules;
    private _id;
    readonly id: number;
    readonly value: any;
    readonly name: string;
    readonly rules: ValidationRules;
    readonly dirty: boolean;
    readonly touched: boolean;
    readonly invalid: boolean;
    readonly errors: ValidationError[];
    constructor(props: IFieldProps);
    touch(): void;
    setValue(value: any): void;
    setValidity(errors: ValidationError[]): void;
    protected initialize(): void;
}
