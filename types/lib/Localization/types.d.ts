import { Pool } from '../Core/types';
export declare type Locale = string;
export declare type PhraseToken = string;
export declare type Phrase = string;
export declare type Translation = Phrase | IPhraseTranslationFunction;
export declare type Translations = Pool<Translation>;
export interface ILocalizationResource {
    [locale: string]: Translations;
}
export interface IPhraseTranslationFunction {
    (...args: any[]): Phrase;
}
