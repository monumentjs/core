import Dictionary from './Dictionary';
import {PhraseToken, ILocalizationResource, Translations, Locale} from './types';
import {Pool} from '../Core/types';


const UNIVERSAL_LOCALE = 'any';


class LocalizationService {
    private _dictionaries: Pool<Dictionary>;
    private _locale: Locale;


    constructor() {
        this._dictionaries = Object.create(null);
    }


    public initialize(locale: Locale) {
        this._locale = locale;
    }


    public hasDictionary(locale: Locale) {
        return (locale in this._dictionaries);
    }


    public translate(token: PhraseToken, ...args: any[]): string {
        let dictionary: Dictionary;
        let locale: Locale;

        if (this.hasDictionary(this._locale)) {
            dictionary = this._dictionaries[this._locale];
            locale = this._locale;
        } else {
            dictionary = this._dictionaries[UNIVERSAL_LOCALE];
            locale = UNIVERSAL_LOCALE;
        }

        if (!dictionary) {
            throw new Error(`Dictionary for locale "${locale}" not found.`);
        }

        return dictionary.translate(token, ...args);
    }


    public addResource(resource: ILocalizationResource) {
        Object.keys(resource).forEach((locale: Locale) => {
            let translations: Translations = resource[locale];

            this.extendDictionary(locale, translations);
        });
    }


    protected extendDictionary(locale: Locale, translations: Translations) {
        if (!(locale in this._dictionaries)) {
            this._dictionaries[locale] = new Dictionary(locale);
        }

        this._dictionaries[locale].extend(translations);
    }
}


export default new LocalizationService();