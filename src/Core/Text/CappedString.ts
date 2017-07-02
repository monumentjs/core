

import {Assert} from '../Assertion/Assert';
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
        Assert.argument('length', length).notNull();
        Assert.argument('initialValue', initialValue).notNull();

        this._length = length;
        this._value = initialValue;
    }
    
    
    public append(text: string): void {
        Assert.argument('text', text).notNull();

        this._value = this.cutText(this._value + text);
    }
    
    
    public prepend(text: string): void {
        Assert.argument('text', text).notNull();

        this._value = this.cutText(text + this._value);
    }
    
    
    public clear(): void {
        this._value = '';
    }
    
    
    public contains(substring: string): boolean {
        Assert.argument('text', substring).notNull();

        return this._value.indexOf(substring) >= 0;
    }
    
    
    public startsWith(substring: string): boolean {
        Assert.argument('text', substring).notNull();

        return this._value.startsWith(substring);
    }
    
    
    public endsWith(substring: string): boolean {
        Assert.argument('text', substring).notNull();

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

