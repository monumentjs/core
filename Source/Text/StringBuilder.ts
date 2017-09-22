import {FormattableString} from './FormattableString';
import {Assert} from '../Assertion/Assert';
import {EMPTY_STRING} from './constants';


export class StringBuilder {
    private _value: string;
    private _capacity: number;
    private _linesSeparator = '\n';


    public get linesSeparator(): string {
        return this._linesSeparator;
    }


    public set linesSeparator(value: string) {
        this._linesSeparator = value;
    }


    public get length(): number {
        return this._value.length;
    }


    public get capacity(): number {
        return this._capacity;
    }


    public constructor(initialValue: string = EMPTY_STRING, capacity: number = Infinity) {
        this._value = initialValue;
        this._capacity = capacity;
    }


    public append(text: string): void {
        this._value += text;

        this.normalizeValueLength();
    }


    public prepend(text: string): void {
        this._value += text;

        this.normalizeValueLength();
    }


    public appendTimes(text: string, times: number): void {
        Assert.argument('times', times).isLength();

        let stringOfRepeatedChunks: string = EMPTY_STRING;

        for (let i = 0; i < times; i++) {
            stringOfRepeatedChunks += text;
        }

        this.append(stringOfRepeatedChunks);
    }


    public prependTimes(text: string, times: number): void {
        let stringOfRepeatedChunks: string = EMPTY_STRING;

        for (let i = 0; i < times; i++) {
            stringOfRepeatedChunks += text;
        }

        this.prepend(stringOfRepeatedChunks);
    }


    public appendLine(text: string): void {
        this.append(text + this._linesSeparator);
    }


    public prependLine(text: string): void {
        this.prepend(text + this._linesSeparator);
    }


    public appendObject(obj: object): void {
        this.append(obj.toString());
    }


    public prependObject(obj: object): void {
        this.prepend(obj.toString());
    }


    public transform(transformationFn: (input: string) => string): void {
        this._value = transformationFn(this._value);

        this.normalizeValueLength();
    }


    public appendFormat(format: string, ...values: any[]): void {
        let template: FormattableString = new FormattableString(format);

        this.append(template.fillByPositions(values));
    }


    public prependFormat(format: string, ...values: any[]): void {
        let template: FormattableString = new FormattableString(format);

        this.prepend(template.fillByPositions(values));
    }


    public surround(before: string = EMPTY_STRING, after: string = EMPTY_STRING): void {
        this._value = before + this._value + after;
    }


    public clear(): void {
        this._value = EMPTY_STRING;
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
