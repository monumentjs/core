import {EMPTY_STRING} from './Strings';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class CappedString {
    private readonly _maxLength: number;
    private _value: string;


    public get value(): string {
        return this._value;
    }


    public get firstChar(): string {
        return this._value[0];
    }


    public get lastChar(): string {
        return this._value[this._value.length - 1];
    }


    public constructor(maxLength: number, initialValue: string = EMPTY_STRING) {
        this._maxLength = maxLength;
        this._value = this.cutText(initialValue);
    }


    public append(text: string): void {
        this._value = this.cutText(this._value + text);
    }


    public prepend(text: string): void {
        this._value = this.cutText(text + this._value);
    }


    public clear(): void {
        this._value = EMPTY_STRING;
    }


    public contains(substring: string): boolean {
        return this._value.indexOf(substring) >= 0;
    }


    public startsWith(substring: string): boolean {
        return this._value.startsWith(substring);
    }


    public endsWith(substring: string): boolean {
        return this._value.endsWith(substring);
    }


    public toString(): string {
        return this._value;
    }


    private cutText(newValue: string): string {
        let startPosition: number = newValue.length - this._maxLength;
        const endPosition: number = newValue.length;

        if (startPosition < 0) {
            startPosition = 0;
        }

        return newValue.slice(startPosition, endPosition);
    }
}

