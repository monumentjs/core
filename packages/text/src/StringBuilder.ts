import { EMPTY_STRING, EOL_CRLF } from './Strings';
import { TemplateString } from './TemplateString';
import { Builder, ToString } from '@monument/core';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class StringBuilder implements Builder<string>, ToString {
  private readonly _capacity: number;
  private _value: string;
  private _linesSeparator: string = EOL_CRLF;

  get capacity(): number {
    return this._capacity;
  }

  get length(): number {
    return this._value.length;
  }

  get linesSeparator(): string {
    return this._linesSeparator;
  }

  set linesSeparator(value: string) {
    this._linesSeparator = value;
  }

  constructor(initialValue: string = EMPTY_STRING, capacity: number = Infinity) {
    this._value = initialValue;
    this._capacity = capacity;
  }

  append(text: string): this {
    this._value += text;

    this.normalizeValueLength();

    return this;
  }

  appendFormat(format: string, ...values: ToString[]): this {
    const template: TemplateString = new TemplateString(format);

    this.append(template.fillByPositions(values));

    return this;
  }

  appendLine(text: string = EMPTY_STRING): this {
    this.append(text + this._linesSeparator);

    return this;
  }

  appendObject(obj: object): this {
    this.append(obj.toString());

    return this;
  }

  build(): string {
    return this._value;
  }

  clear(): this {
    this._value = EMPTY_STRING;

    return this;
  }

  prepend(text: string): this {
    this._value = text + this._value;

    this.normalizeValueLength();

    return this;
  }

  prependFormat(format: string, ...values: ToString[]): this {
    const template: TemplateString = new TemplateString(format);

    this.prepend(template.fillByPositions(values));

    return this;
  }

  prependLine(text: string = EMPTY_STRING): this {
    this.prepend(text + this._linesSeparator);

    return this;
  }

  prependObject(obj: object): this {
    this.prepend(obj.toString());

    return this;
  }

  surround(before: string = EMPTY_STRING, after: string = EMPTY_STRING): this {
    this._value = before + this._value + after;

    return this;
  }

  toString(): string {
    return this._value;
  }

  transform(transformationFn: (input: string) => string): void {
    this._value = transformationFn(this._value);

    this.normalizeValueLength();
  }

  private normalizeValueLength(): void {
    if (this._value.length > this._capacity) {
      this._value = this._value.substring(this._value.length - this._capacity);
    }
  }
}
