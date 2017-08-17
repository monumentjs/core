import {Singleton} from '../../DI/Decorators/Singleton';
import {Assert} from '../../Assertion/Assert';
import {RandomNumberGenerator} from './RandomNumberGenerator';
import {EMPTY_STRING} from '../../Text/constants';
import {Inject} from '../../DI/Decorators/Inject';


@Singleton()
export class RandomStringGenerator {
    public static readonly NUMERIC_CHARSET: string = '1234567890';
    public static readonly ALPHABETIC_CHARSET: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly ALPHA_NUMERIC_CHARSET: string = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly HEX_CHARSET: string = '1234567890ABCDEF';


    @Inject(RandomNumberGenerator)
    private readonly numberGenerator: RandomNumberGenerator;


    public getString(length: number, charset: string): string {
        Assert.argument('length', length).notNull().bounds(1, Infinity);
        Assert.argument('charset', charset).notNull().notEmptyString();

        let value: string = EMPTY_STRING;

        for (let i = 0; i < length; i++) {
            let characterIndex: number = this.numberGenerator.getInteger(0, charset.length);

            value += charset[characterIndex];
        }

        return value;
    }


    public getNumericString(length: number): string {
        return this.getString(length, RandomStringGenerator.NUMERIC_CHARSET);
    }


    public getAlphabeticString(length: number): string {
        return this.getString(length, RandomStringGenerator.ALPHABETIC_CHARSET);
    }


    public getAlphaNumericString(length: number): string {
        return this.getString(length, RandomStringGenerator.ALPHA_NUMERIC_CHARSET);
    }


    public getHexString(length: number): string {
        return this.getString(length, RandomStringGenerator.HEX_CHARSET);
    }
}
