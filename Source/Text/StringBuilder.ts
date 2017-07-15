import {FormattableString} from './FormattableString';
import {Assert} from '../Assertion/Assert';


export class StringBuilder {
    private _value: string;
    private _capacity: number;
    private _linesSeparator = '\n';


    public get linesSeparator(): string {
        return this._linesSeparator;
    }


    public set linesSeparator(value: string) {
        Assert.argument('value', value).notNull();

        this._linesSeparator = value;
    }


    public get length(): number {
        return this._value.length;
    }


    public get capacity(): number {
        return this._capacity;
    }


    public constructor(initialValue: string = '', capacity: number = Infinity) {
        Assert.argument('initialValue', initialValue).notNull();
        Assert.argument('capacity', capacity).notNull();

        this._value = initialValue;
        this._capacity = capacity;
    }


    public append(text: string): void {
        Assert.argument('text', text).notNull();

        this._value += text;

        this.normalizeValueLength();
    }


    public prepend(text: string): void {
        Assert.argument('text', text).notNull();

        this._value += text;

        this.normalizeValueLength();
    }


    public appendTimes(text: string, times: number): void {
        Assert.argument('text', text).notNull();
        Assert.argument('times', times).notNull();

        let stringOfRepeatedChunks: string = '';

        for (let i = 0; i < times; i++) {
            stringOfRepeatedChunks += text;
        }

        this.append(stringOfRepeatedChunks);
    }


    public prependTimes(text: string, times: number): void {
        Assert.argument('text', text).notNull();
        Assert.argument('times', times).notNull();

        let stringOfRepeatedChunks: string = '';

        for (let i = 0; i < times; i++) {
            stringOfRepeatedChunks += text;
        }

        this.prepend(stringOfRepeatedChunks);
    }


    public appendLine(text: string): void {
        Assert.argument('text', text).notNull();

        this.append(text + this._linesSeparator);
    }


    public prependLine(text: string): void {
        Assert.argument('text', text).notNull();

        this.prepend(text + this._linesSeparator);
    }


    public appendObject(obj: object): void {
        Assert.argument('obj', obj).notNull();

        this.append(obj.toString());
    }


    public prependObject(obj: object): void {
        Assert.argument('obj', obj).notNull();

        this.prepend(obj.toString());
    }


    public transform(transformationFn: (input: string) => string): void {
        Assert.argument('transformationFn', transformationFn).notNull();

        this._value = transformationFn(this._value);

        this.normalizeValueLength();
    }


    public appendFormat(format: string, ...values: any[]): void {
        Assert.argument('format', format).notNull();

        let template: FormattableString = new FormattableString(format);

        this.append(template.fillByPositions(values));
    }


    public prependFormat(format: string, ...values: any[]): void {
        Assert.argument('format', format).notNull();

        let template: FormattableString = new FormattableString(format);

        this.prepend(template.fillByPositions(values));
    }


    public surround(before: string = '', after: string = ''): void {
        Assert.argument('before', before).notNull();
        Assert.argument('after', after).notNull();

        this._value = before + this._value + after;
    }


    public clear(): void {
        this._value = '';
    }


    public toString(): string {
        return this._value;
    }


    private normalizeValueLength(): void {
        if (this._value.length > this._capacity) {
            this._value = this._value.substring(this._value.length - this._capacity);
        }
    }
}
