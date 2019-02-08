import { EMPTY_STRING } from '../text/Strings';
import { InvalidArgumentException } from '../exceptions/InvalidArgumentException';
import { RandomInt } from './RandomInt';
import { RandomValue } from './RandomValue';
import { ToJSON } from '../base/ToJSON';
import { ToString } from '../base/ToString';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class RandomString implements RandomValue<string>, ToJSON<string>, ToString {
    public static readonly NUMERIC_CHARSET: string = '1234567890';
    public static readonly ALPHABETIC_CHARSET: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly ALPHA_NUMERIC_CHARSET: string = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly HEX_CHARSET: string = '1234567890ABCDEF';
    private _value?: string;
    private readonly _length: number;
    private readonly _charset: string;

    public get value(): string {
        if (this._value == null) {
            this._value = EMPTY_STRING;

            for (let i = 0; i < this._length; i++) {
                const characterIndex: number = new RandomInt(0, this._charset.length).value;

                this._value += this._charset[characterIndex];
            }
        }

        return this._value;
    }

    public constructor(length: number);
    public constructor(length: number, charset: string);
    public constructor(length: number, charset: string = RandomString.ALPHA_NUMERIC_CHARSET) {
        if (length < 0) {
            throw new InvalidArgumentException('Char sequence length cannot be negative.');
        }

        if (charset.length === 0) {
            throw new InvalidArgumentException('Charset cannot be empty.');
        }

        this._length = length;
        this._charset = charset;
    }

    public toJSON(): string {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}
