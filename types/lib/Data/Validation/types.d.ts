import ValidationError from './ValidationError';
import { AsyncResult } from '../../Core/types';
export interface IValidator<R> {
    /**
     * Performs validation of instance data.
     */
    validate(...args: any[]): R;
}
export interface IAsyncValidator<R> {
    /**
     * Performs async validation of instance data.
     */
    validate(...args: any[]): AsyncResult<R>;
}
export interface IValidationRule<M> extends IValidator<ValidationResult> {
    validate(model: M, property?: string): ValidationResult;
}
export declare type ValidationRules = Array<IValidationRule<any>>;
export declare type ValidationResult = AsyncResult<ValidationError[]>;
