import { Translations, PhraseToken, Phrase } from './types';
export default class Dictionary {
    private _locale;
    private _safe;
    private _translations;
    readonly locale: string;
    isSafe: boolean;
    constructor(locale: string, safe?: boolean);
    extend(translations: Translations): void;
    translate(token: PhraseToken, ...args: any[]): Phrase;
}
