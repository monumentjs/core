import { EMPTY_STRING } from './Strings';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class CappedString {
  private readonly _maxLength: number;
  private _value: string;

  get firstChar(): string {
    return this._value[0];
  }

  get lastChar(): string {
    return this._value[this._value.length - 1];
  }

  get value(): string {
    return this._value;
  }

  constructor(maxLength: number, initialValue: string = EMPTY_STRING) {
    this._maxLength = maxLength;
    this._value = this.cutText(initialValue);
  }

  append(text: string): void {
    this._value = this.cutText(this._value + text);
  }

  clear(): void {
    this._value = EMPTY_STRING;
  }

  contains(substring: string): boolean {
    return this._value.indexOf(substring) >= 0;
  }

  endsWith(substring: string): boolean {
    return this._value.endsWith(substring);
  }

  prepend(text: string): void {
    this._value = this.cutText(text + this._value);
  }

  startsWith(substring: string): boolean {
    return this._value.startsWith(substring);
  }

  toString(): string {
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
