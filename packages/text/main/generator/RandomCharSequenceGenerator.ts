import {RandomNumberGenerator} from '@monument/core/main/data/generator/RandomNumberGenerator';
import {EMPTY_STRING} from '@monument/core/main/constants';
import {Assert} from '@monument/assert/main/Assert';
import {CharSequenceGenerator} from './CharSequenceGenerator';


export class RandomCharSequenceGenerator implements CharSequenceGenerator {
    public static readonly NUMERIC_CHARSET: string = '1234567890';
    public static readonly ALPHABETIC_CHARSET: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly ALPHA_NUMERIC_CHARSET: string = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly HEX_CHARSET: string = '1234567890ABCDEF';


    public generate(length: number, charset: string): string {
        Assert.argument('length', length).isLength();
        Assert.argument('charset', charset).notEmptyString();

        let value: string = EMPTY_STRING;

        for (let i = 0; i < length; i++) {
            let characterIndex: number = RandomNumberGenerator.getInteger(0, charset.length);

            value += charset[characterIndex];
        }

        return value;
    }
}
