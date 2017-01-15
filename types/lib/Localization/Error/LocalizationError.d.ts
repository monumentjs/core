import { LocalizedError } from './LocalizedError';
import { PhraseToken } from '../types';
export default class LocalizationError extends LocalizedError {
    private _code;
    readonly code: string;
    constructor(token: PhraseToken, ...args: any[]);
}
