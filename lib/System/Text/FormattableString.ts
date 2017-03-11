import IndexOutOfBoundsException from '../../Core/Exceptions/IndexOutOfBoundsException';
import MissingKeyException from '../../Core/Exceptions/MissingKeyException';
import Collection from '../../Core/Collections/Collection';
import ReadOnlyCollection from '../../Core/Collections/ReadOnlyCollection';
import ParsingException from './ParsingException';
import RegExpUtils from './RegExpUtils';


const NORMAL_ENTRY_PATTERN: RegExp = /\{(\w+)}/g;
const ESCAPED_ENTRY_PATTERN: RegExp = /\\\{(\w+)\\}/g;


export default class FormattableString {
    private _template: string;
    private _allEntries: Collection<string> = new Collection<string>();
    private _uniqueEntries: ReadOnlyCollection<string>;
    private _extractingPattern: RegExp;


    public get uniqueEntries(): ReadOnlyCollection<string> {
        return this._uniqueEntries;
    }


    public constructor(template: string) {
        this._template = template;
        this._allEntries = this.getAllEntries();
        this._uniqueEntries = this.getUniqueEntries();
        this._extractingPattern = this.createExtractingPattern();
    }


    public fillByPositions(values: Object[]): string {
        return this.fillEntries((key: string): string => {
            let index: number = parseInt(key, 10);

            if (index >= 0 && index < values.length) {
                return values[index] + '';
            } else {
                throw new IndexOutOfBoundsException(index, 0, values.length);
            }
        });
    }


    public fillByKeys(values: object): string {
        return this.fillEntries((key: string): string => {
            if (values[key] != null) {
                return values[key] + '';
            } else {
                throw new MissingKeyException(`Entry "${key}" is not defined.`);
            }
        });
    }


    public tryFillByPositions(values: Object[]): string {
        return this.fillEntries((key: string): string => {
            let index: number = parseInt(key, 10);

            if (index >= 0 && index < values.length) {
                return values[index] + '';
            } else {
                return '';
            }
        });
    }


    public tryFillByKeys(values: object): string {
        return this.fillEntries((key: string): string => {
            if (values[key] != null) {
                return values[key] + '';
            } else {
                return '';
            }
        });
    }


    public extractValues(source: string): object {
        let match: RegExpExecArray = this._extractingPattern.exec(source);
        let values: object = {};

        if (!match) {
            throw new ParsingException(`Source string does not match the pattern.`);
        }

        match.slice(1).forEach((entryValue: string, index: number) => {
            let entryKey: string = this._allEntries[index];

            values[entryKey] = entryValue;
        });

        return values;
    }


    public tryExtractValues(source: string): object {
        try {
            return this.extractValues(source);
        } catch (ex) {
            return null;
        }
    }


    public toString(): string {
        return this._template;
    }


    private getAllEntries(): ReadOnlyCollection<string> {
        let match: RegExpExecArray = null;
        let entries: Collection<string> = new Collection<string>();

        do {
            match = NORMAL_ENTRY_PATTERN.exec(this._template);

            if (match != null) {
                entries.add(match[1]);
            }
        } while (match != null);

        return new ReadOnlyCollection<string>(entries);
    }


    private getUniqueEntries(): ReadOnlyCollection<string> {
        let match: RegExpExecArray = null;
        let entries: Collection<string> = new Collection<string>();

        do {
            match = NORMAL_ENTRY_PATTERN.exec(this._template);

            if (match != null) {
                if (!entries.contains(match[1])) {
                    entries.add(match[1]);
                }
            }
        } while (match != null);

        return new ReadOnlyCollection<string>(entries);
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
