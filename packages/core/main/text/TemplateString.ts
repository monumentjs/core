import {StringPool} from '../StringPool';
import {MissingKeyException} from '../exceptions/MissingKeyException';
import {ListMap} from '../collection/mutable/ListMap';
import {ArrayList} from '../collection/mutable/ArrayList';
import {ReadOnlyMap} from '../collection/readonly/ReadOnlyMap';
import {ReadOnlyList} from '../collection/readonly/ReadOnlyList';
import {ReadOnlyCollection} from '../collection/readonly/ReadOnlyCollection';
import {ParsingException} from './parser/ParsingException';
import {RegExpUtils} from './RegExpUtils';
import {IndexOutOfBoundsException} from '../exceptions/IndexOutOfBoundsException';

const NORMAL_ENTRY_PATTERN: RegExp = /{(\w+)}/g;
const ESCAPED_ENTRY_PATTERN: RegExp = /\\{(\w+)\\}/g;


export class TemplateString {
    private readonly _template: string;
    private readonly _allEntries: ReadOnlyList<string>;
    private readonly _uniqueEntries: ReadOnlyList<string>;
    private readonly _extractionPattern: RegExp;


    public get uniqueEntries(): ReadOnlyCollection<string> {
        return this._uniqueEntries;
    }


    public constructor(template: string) {
        this._template = template;
        this._allEntries = this.getAllEntries();
        this._uniqueEntries = this.getUniqueEntries();
        this._extractionPattern = this.createExtractingPattern();
    }


    public fillByPositions(values: any[]): string {
        return this.fillEntries((key: string): string => {
            const index: number = parseInt(key, 10);

            IndexOutOfBoundsException.testIndex(index, values.length);

            return values[index] + StringPool.BLANK;
        });
    }


    public fillByKeys(values: ReadOnlyMap<string, string>): string {
        return this.fillEntries((key: string): string => {
            if (values.containsKey(key)) {
                return values.get(key) + StringPool.BLANK;
            } else {
                throw new MissingKeyException(`Entry "${key}" is not defined.`);
            }
        });
    }


    public tryFillByPositions(values: any[]): string {
        return this.fillEntries((key: string): string => {
            const index: number = parseInt(key, 10);

            if (index >= 0 && index < values.length) {
                return values[index] + StringPool.BLANK;
            } else {
                return StringPool.BLANK;
            }
        });
    }


    public tryFillByKeys(values: ReadOnlyMap<string, string>): string {
        return this.fillEntries((key: string): string => {
            const value = values.get(key);

            if (value == null) {
                return StringPool.BLANK;
            }

            return value + StringPool.BLANK;
        });
    }


    public extractValues(source: string): ReadOnlyMap<string, string> {
        const values: ListMap<string, string> = new ListMap();
        const match: RegExpExecArray | null = this._extractionPattern.exec(source);

        if (!match) {
            throw new ParsingException(`Source string does not match the pattern.`);
        }

        match.slice(1).forEach((entryValue: string, index: number) => {
            const entryKey: string | undefined = this._allEntries.getAt(index);

            if (entryKey != null) {
                values.put(entryKey, entryValue);
            }
        });

        return values;
    }


    public tryExtractValues(source: string): ReadOnlyMap<string, string> | undefined {
        try {
            return this.extractValues(source);
        } catch (ex) {
            return;
        }
    }


    public toString(): string {
        return this._template;
    }


    private getAllEntries(): ReadOnlyList<string> {
        const entries: ArrayList<string> = new ArrayList();
        let match: RegExpExecArray | null;

        do {
            match = NORMAL_ENTRY_PATTERN.exec(this._template);

            if (match != null) {
                entries.add(match[1]);
            }
        } while (match != null);

        return entries;
    }


    private getUniqueEntries(): ReadOnlyList<string> {
        const entries: ArrayList<string> = new ArrayList();
        let match: RegExpExecArray | null;

        do {
            match = NORMAL_ENTRY_PATTERN.exec(this._template);

            if (match != null) {
                if (!entries.contains(match[1])) {
                    entries.add(match[1]);
                }
            }
        } while (match != null);

        return entries;
    }


    private fillEntries(selector: (key: string) => string): string {
        return this._template.replace(NORMAL_ENTRY_PATTERN, (substring: string, ...groups: string[]): string => {
            return selector(groups[0]);
        });
    }


    private createExtractingPattern(): RegExp {
        let pattern: string = RegExpUtils.escape(this._template);

        pattern = pattern.replace(ESCAPED_ENTRY_PATTERN, (): string => {
            return `(.+)`;
        });

        return new RegExp(`^${pattern}$`);
    }
}
