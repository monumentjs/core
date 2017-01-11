import './Resources/ValidationErrors';
import {LocalizedError} from '../../../Localization/Error/LocalizedError';
import {IValidationRule} from './types';


export default class ValidationError extends LocalizedError {
    private _code: string;


    get code(): string {
        return this._code;
    }


    constructor(token: string, model: any, property: string, rule: IValidationRule<any>, ...args: any[]) {
        super(token, model, property, rule, ...args);

        this._code = 'E_VALIDATION';
    }
}