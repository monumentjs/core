import {Assert} from '../../Assertion/Assert';
import {RandomNumberGenerator} from './RandomNumberGenerator';
import {EMPTY_STRING} from '../../Text/constants';


export class RandomStringGenerator {
    public static readonly NUMERIC_CHARSET: string = '1234567890';
    public static readonly ALPHABETIC_CHARSET: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly ALPHA_NUMERIC_CHARSET: string = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly HEX_CHARSET: string = '1234567890ABCDEF';


    public static getString(length: number, charset: string): string {
        Assert.argument('length', length).isLength();
        Assert.argument('charset', charset).notEmptyString();

        let value: string = EMPTY_STRING;

        for (let i = 0; i < length; i++) {
            let characterIndex: number = RandomNumberGenerator.getInteger(0, charset.length);

            value += charset[characterIndex];
        }

        return value;
    }


    public static getNumericString(length: number): string {
        return this.getString(length, RandomStringGenerator.NUMERIC_CHARSET);
    }


    public static getAlphabeticString(length: number): string {
        return this.getString(length, RandomStringGenerator.ALPHABETIC_CHARSET);
    }


    public static getAlphaNumericString(length: number): string {
        return this.getString(length, RandomStringGenerator.ALPHA_NUMERIC_CHARSET);
    }


    public static getHexString(length: number): string {
        return this.getString(length, RandomStringGenerator.HEX_CHARSET);
    }
}
