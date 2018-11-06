import {StringPool} from './StringPool';
import {TemplateString} from './TemplateString';
import {Builder} from '../base/Builder';
import {ToString} from '../base/ToString';


/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class StringBuilder implements Builder<string>, ToString {
    private readonly _capacity: number;
    private _value: string;
    private _linesSeparator: string = StringPool.EOL_CRLF;

    public get capacity(): number {
        return this._capacity;
    }

    public get length(): number {
        return this._value.length;
    }

    public get linesSeparator(): string {
        return this._linesSeparator;
    }

    public set linesSeparator(value: string) {
        this._linesSeparator = value;
    }

    public constructor(initialValue: string = StringPool.BLANK, capacity: number = Infinity) {
        this._value = initialValue;
        this._capacity = capacity;
    }

    public append(text: string): this {
        this._value += text;

        this.normalizeValueLength();

        return this;
    }

    public appendFormat(format: string, ...values: any[]): this {
        const template: TemplateString = new TemplateString(format);

        this.append(template.fillByPositions(values));

        return this;
    }

    public appendLine(text: string = StringPool.BLANK): this {
        this.append(text + this._linesSeparator);

        return this;
    }

    public appendObject(obj: object): this {
        this.append(obj.toString());

        return this;
    }

    public build(): string {
        return this._value;
    }

    public clear(): this {
        this._value = StringPool.BLANK;

        return this;
    }

    public prepend(text: string): this {
        this._value = text + this._value;

        this.normalizeValueLength();

        return this;
    }

    public prependFormat(format: string, ...values: any[]): this {
        const template: TemplateString = new TemplateString(format);

        this.prepend(template.fillByPositions(values));

        return this;
    }

    public prependLine(text: string = StringPool.BLANK): this {
        this.prepend(text + this._linesSeparator);

        return this;
    }

    public prependObject(obj: object): this {
        this.prepend(obj.toString());

        return this;
    }

    public surround(before: string = StringPool.BLANK, after: string = StringPool.BLANK): this {
        this._value = before + this._value + after;

        return this;
    }

    public toString(): string {
        return this._value;
    }

    public transform(transformationFn: (input: string) => string): void {
        this._value = transformationFn(this._value);

        this.normalizeValueLength();
    }

    private normalizeValueLength(): void {
        if (this._value.length > this._capacity) {
            this._value = this._value.substring(this._value.length - this._capacity);
        }
    }
}
