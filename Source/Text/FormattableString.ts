import {MissingKeyException} from '../Exceptions/MissingKeyException';
import {Collection} from '../Collections/Collection';
import {ReadOnlyCollection} from '../Collections/ReadOnlyCollection';
import {ParsingException} from './Parsing/ParsingException';
import {RegExpHelper} from './RegExpHelper';
import {Assert} from '../Assertion/Assert';
import {Dictionary} from '../Collections/Dictionary';
import {EMPTY_STRING} from './constants';
import {UnitGetter} from '../DI/Decorators/UnitGetter';


const NORMAL_ENTRY_PATTERN: RegExp = /{(\w+)}/g;
const ESCAPED_ENTRY_PATTERN: RegExp = /\\{(\w+)\\}/g;


export class FormattableString {
    @UnitGetter(RegExpHelper)
    private readonly regExpHelper: RegExpHelper;

    private _template: string;
    private _allEntries: ReadOnlyCollection<string> = new ReadOnlyCollection<string>();
    private _uniqueEntries: ReadOnlyCollection<string>;
    private _extractingPattern: RegExp;


    public get uniqueEntries(): ReadOnlyCollection<string> {
        return this._uniqueEntries;
    }


    public constructor(template: string) {
        Assert.argument('template', template).notNull();

        this._template = template;
        this._allEntries = this.getAllEntries();
        this._uniqueEntries = this.getUniqueEntries();
        this._extractingPattern = this.createExtractingPattern();
    }


    public fillByPositions(values: any[]): string {
        Assert.argument('values', values).notNull();

        return this.fillEntries((key: string): string => {
            let index: number = parseInt(key, 10);

            Assert.sequence(values).containsIndex(index);

            return values[index] + EMPTY_STRING;
        });
    }


    public fillByKeys(values: object): string {
        Assert.argument('values', values).notNull();

        return this.fillEntries((key: string): string => {
            if (values[key] != null) {
                return values[key] + EMPTY_STRING;
            } else {
                throw new MissingKeyException(`Entry "${key}" is not defined.`);
            }
        });
    }


    public tryFillByPositions(values: any[]): string {
        Assert.argument('values', values).notNull();

        return this.fillEntries((key: string): string => {
            let index: number = parseInt(key, 10);

            if (index >= 0 && index < values.length) {
                return values[index] + EMPTY_STRING;
            } else {
                return EMPTY_STRING;
            }
        });
    }


    public tryFillByKeys(values: object): string {
        Assert.argument('values', values).notNull();

        return this.fillEntries((key: string): string => {
            if (values[key] != null) {
                return values[key] + EMPTY_STRING;
            } else {
                return EMPTY_STRING;
            }
        });
    }


    public extractValues(source: string): Dictionary<string, string> {
        Assert.argument('source', source).notNull();

        let values: Dictionary<string, string> = new Dictionary<string, string>();
        let match: RegExpExecArray = this._extractingPattern.exec(source);

        if (!match) {
            throw new ParsingException(`Source string does not match the pattern.`);
        }

        match.slice(1).forEach((entryValue: string, index: number) => {
            let entryKey: string = this._allEntries[index];

            values.set(entryKey, entryValue);
        });

        return values;
    }


    public tryExtractValues(source: string): Dictionary<string, string> {
        Assert.argument('source', source).notNull();

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
        let pattern: string = this.regExpHelper.escape(this._template);

        pattern = pattern.replace(ESCAPED_ENTRY_PATTERN, (): string => {
            return `(.+)`;
        });

        return new RegExp(`^${pattern}$`);
    }
}
