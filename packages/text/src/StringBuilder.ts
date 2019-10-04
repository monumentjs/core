import { Func1, ToString } from '@monument/core';
import { TemplateString } from './TemplateString';
import { TextBuffer } from './TextBuffer';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class StringBuilder implements ToString, TextBuffer {
  private readonly _capacity: number;
  private _value: string;
  private _linesSeparator: string = '\r\n';

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

  constructor(initialValue: string = '', capacity: number = Infinity) {
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

  appendLine(text: string = ''): this {
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
    this._value = '';

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

  prependLine(text: string = ''): this {
    this.prepend(text + this._linesSeparator);

    return this;
  }

  prependObject(obj: object): this {
    this.prepend(obj.toString());

    return this;
  }

  surround(before: string = '', after: string = ''): this {
    this._value = before + this._value + after;

    return this;
  }

  toString(): string {
    return this._value;
  }

  transform(transformationFn: Func1<string, string>): void {
    this._value = transformationFn(this._value);

    this.normalizeValueLength();
  }

  private normalizeValueLength(): void {
    if (this._value.length > this._capacity) {
      this._value = this._value.substring(this._value.length - this._capacity);
    }
  }
}
