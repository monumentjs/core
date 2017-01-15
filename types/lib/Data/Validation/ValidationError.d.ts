import './Resources/ValidationErrors';
import { LocalizedError } from '../../Localization/Error/LocalizedError';
import { IValidationRule } from './types';
export default class ValidationError extends LocalizedError {
    private _code;
    readonly code: string;
    constructor(token: string, model: any, property: string, rule: IValidationRule<any>, ...args: any[]);
}
