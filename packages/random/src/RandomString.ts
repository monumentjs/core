import { argument } from '@monument/assert';
import { ToJSON, ToString } from '@monument/core';
import { RandomValue } from './RandomValue';
import { RandomInt } from './RandomInt';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class RandomString implements RandomValue<string>, ToJSON<string>, ToString {
  static readonly NUMERIC_CHARSET: string = '1234567890';
  static readonly ALPHABETIC_CHARSET: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
  static readonly ALPHA_NUMERIC_CHARSET: string = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
  static readonly HEX_CHARSET: string = '1234567890ABCDEF';

  static numeric(length: number): RandomString {
    return new RandomString(length, this.NUMERIC_CHARSET);
  }

  static alphabetic(length: number): RandomString {
    return new RandomString(length, this.ALPHABETIC_CHARSET);
  }

  static alphanumeric(length: number): RandomString {
    return new RandomString(length, this.ALPHA_NUMERIC_CHARSET);
  }

  static hex(length: number): RandomString {
    return new RandomString(length, this.HEX_CHARSET);
  }

  private _value?: string;
  private readonly _length: number;
  private readonly _charset: string;

  get value(): string {
    if (this._value == null) {
      this._value = '';

      for (let i = 0; i < this._length; i++) {
        const characterIndex: number = new RandomInt(0, this._charset.length).value;

        this._value += this._charset[characterIndex];
      }
    }

    return this._value;
  }

  constructor(length: number);
  constructor(length: number, charset: string);
  constructor(length: number, charset: string = RandomString.ALPHA_NUMERIC_CHARSET) {
    argument(length >= 0, 'Char sequence length must be greater than or equal to 0');
    argument(charset.length > 0, 'Charset cannot be empty');

    this._length = length;
    this._charset = charset;
  }

  toJSON(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  valueOf(): string {
    return this.value;
  }
}
