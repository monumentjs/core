import LocalizationError from './Error/LocalizationError';
import {Translations, PhraseToken, Phrase, Translation} from './types';


export default class Dictionary {
    private _locale: string;
    private _safe: boolean;
    private _translations: Translations;


    get locale(): string {
        return this._locale;
    }


    get isSafe(): boolean {
        return this._safe;
    }


    set isSafe(safe: boolean) {
        this._safe = safe;
    }


    constructor(locale: string, safe: boolean = true) {
        this._locale = locale;
        this._safe = safe;
        this._translations = Object.create(null);
    }


    public extend(translations: Translations) {
        Object.assign(this._translations, translations);
    }


    public translate(token: PhraseToken, ...args: any[]): Phrase {
        let translation: Translation = this._translations[token];

        if (typeof translation === 'function') {
            return translation(...args);
        } else if (typeof translation === 'string') {
            return translation;
        } else if (this._safe) {
            return token;
        } else {
            throw new LocalizationError(`Translation with token ${token} does not exists.`);
        }
    }
}