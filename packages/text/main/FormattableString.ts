/* Core */
import {MissingKeyException} from '@monument/core/main/exceptions/MissingKeyException';

/* Collections Core */
import {Map} from '../../collections/main/Map';
import {List} from '../../collections/main/List';
import {ReadOnlyCollection} from '../../collections/main/ReadOnlyCollection';

/* Collections */
import {ListMap} from '@monument/collections/main/ListMap';
import {ArrayList} from '@monument/collections/main/ArrayList';

/* Assert */
import {Assert} from '@monument/assert/main/Assert';

import {EMPTY_STRING} from './constants';
import {RegExpUtils} from './RegExpUtils';
import {ParsingException} from '../../text-parser-core/main/ParsingException';


const NORMAL_ENTRY_PATTERN: RegExp = /{(\w+)}/g;
const ESCAPED_ENTRY_PATTERN: RegExp = /\\{(\w+)\\}/g;


export class FormattableString {
    private _template: string;
    private _allEntries: List<string>;
    private _uniqueEntries: List<string>;
    private _extractionPattern: RegExp;


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
            let index: number = parseInt(key, 10);

            Assert.sequence(values).containsIndex(index);

            return values[index] + EMPTY_STRING;
        });
    }


    public fillByKeys(values: Map<string, string>): string {
        return this.fillEntries((key: string): string => {
            if (values.containsKey(key)) {
                return values.get(key) + EMPTY_STRING;
            } else {
                throw new MissingKeyException(`Entry "${key}" is not defined.`);
            }
        });
    }


    public tryFillByPositions(values: any[]): string {
        return this.fillEntries((key: string): string => {
            let index: number = parseInt(key, 10);

            if (index >= 0 && index < values.length) {
                return values[index] + EMPTY_STRING;
            } else {
                return EMPTY_STRING;
            }
        });
    }


    public tryFillByKeys(values: Map<string, string>): string {
        return this.fillEntries((key: string): string => {
            let value = values.get(key);

            if (value == null) {
                return EMPTY_STRING;
            }

            return value + EMPTY_STRING;
        });
    }


    public extractValues(source: string): Map<string, string> {
        let values: Map<string, string> = new ListMap<string, string>();
        let match: RegExpExecArray | null = this._extractionPattern.exec(source);

        if (!match) {
            throw new ParsingException(`Source string does not match the pattern.`);
        }

        match.slice(1).forEach((entryValue: string, index: number) => {
            let entryKey: string | undefined = this._allEntries.getAt(index);

            if (entryKey != null) {
                values.put(entryKey, entryValue);
            }
        });

        return values;
    }


    public tryExtractValues(source: string): Map<string, string> | undefined {
        try {
            return this.extractValues(source);
        } catch (ex) {
            return;
        }
    }


    public toString(): string {
        return this._template;
    }


    private getAllEntries(): List<string> {
        let match: RegExpExecArray | null;
        let entries: List<string> = new ArrayList();

        do {
            match = NORMAL_ENTRY_PATTERN.exec(this._template);

            if (match != null) {
                entries.add(match[1]);
            }
        } while (match != null);

        return entries;
    }


    private getUniqueEntries(): List<string> {
        let match: RegExpExecArray | null;
        let entries: List<string> = new ArrayList();

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
