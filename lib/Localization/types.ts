import {Pool} from '../Core/types';


export type Locale = string;
export type PhraseToken = string;
export type Phrase = string;
export type Translation = Phrase | PhraseTranslationFunction;
export type Translations = Pool<Translation>;


export interface ILocalizationResource {
    [locale: string]: Translations;
}


export type PhraseTranslationFunction = (...args: any[]) => Phrase;

