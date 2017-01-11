import {LocalizedError} from './LocalizedError';
import {PhraseToken} from '../types';


export default class LocalizationError extends LocalizedError {
    private _code: string;


    get code(): string {
        return this._code;
    }


    constructor(token: PhraseToken, ...args: any[]) {
        super(token, ...args);

        this._code = 'E_LOCALIZATION';
    }
}