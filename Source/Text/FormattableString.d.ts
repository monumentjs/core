import { ReadOnlyCollection } from '../Collections/ReadOnlyCollection';
import { Dictionary } from '../Collections/Dictionary';
export declare class FormattableString {
    private _template;
    private _allEntries;
    private _uniqueEntries;
    private _extractingPattern;
    readonly uniqueEntries: ReadOnlyCollection<string>;
    constructor(template: string);
    fillByPositions(values: any[]): string;
    fillByKeys(values: object): string;
    tryFillByPositions(values: any[]): string;
    tryFillByKeys(values: object): string;
    extractValues(source: string): Dictionary<string, string>;
    tryExtractValues(source: string): Dictionary<string, string>;
    toString(): string;
    private getAllEntries();
    private getUniqueEntries();
    private fillEntries(selector);
    private createExtractingPattern();
}
