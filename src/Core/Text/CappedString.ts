

import {assertArgumentNotNull} from '../Assertion/Assert';
export class CappedString {
    private _value: string;
    private _length: number;
    
    
    public get value(): string {
        return this._value;
    }
    
    
    public get firstChar(): string {
        return this._value[0];
    }
    
    
    public get lastChar(): string {
        return this._value[this._value.length - 1];
    }
    
    
    public constructor(length: number, initialValue: string = '') {
        assertArgumentNotNull('length', length);
        assertArgumentNotNull('initialValue', initialValue);

        this._length = length;
        this._value = initialValue;
    }
    
    
    public append(text: string): void {
        assertArgumentNotNull('text', text);

        this._value = this.cutText(this._value + text);
    }
    
    
    public prepend(text: string): void {
        assertArgumentNotNull('text', text);

        this._value = this.cutText(text + this._value);
    }
    
    
    public clear(): void {
        this._value = '';
    }
    
    
    public contains(substring: string): boolean {
        assertArgumentNotNull('text', substring);

        return this._value.indexOf(substring) >= 0;
    }
    
    
    public startsWith(substring: string): boolean {
        assertArgumentNotNull('text', substring);

        return this._value.startsWith(substring);
    }
    
    
    public endsWith(substring: string): boolean {
        assertArgumentNotNull('text', substring);

        return this._value.endsWith(substring);
    }
    
    
    public toString(): string {
        return this._value;
    }
    
    
    private cutText(newValue: string): string {
        let startPosition: number = newValue.length - this._length;
        let endPosition: number = newValue.length;
    
        if (startPosition < 0) {
            startPosition = 0;
        }
    
        return newValue.slice(startPosition, endPosition);
    }
}

