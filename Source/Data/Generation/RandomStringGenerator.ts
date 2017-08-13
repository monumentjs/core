import {Singleton} from '../../DI/Decorators/Singleton';
import {Assert} from '../../Assertion/Assert';
import {RandomNumberGenerator} from './RandomNumberGenerator';
import {Inject} from '../../DI/Decorators/Inject';
import {EMPTY_STRING} from '../../Text/constants';


@Singleton()
export class RandomStringGenerator {
    public static readonly NUMERIC_CHARSET: string = '1234567890';
    public static readonly ALPHABETIC_CHARSET: string = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly ALPHA_NUMERIC_CHARSET: string = '1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    public static readonly HEX_CHARSET: string = '1234567890ABCDEF';


    @Inject(RandomNumberGenerator)
    private readonly numberGenerator: RandomNumberGenerator;


    public generate(length: number, charset: string): string {
        Assert.argument('length', length).notNull().bounds(1, Infinity);
        Assert.argument('charset', charset).notNull().notEmptyString();

        let value: string = EMPTY_STRING;

        for (let i = 0; i < length; i++) {
            let characterIndex: number = this.numberGenerator.generateInteger(0, charset.length);

            value += charset[characterIndex];
        }

        return value;
    }


    public generateNumericString(length: number): string {
        return this.generate(length, RandomStringGenerator.NUMERIC_CHARSET);
    }


    public generateAlphabeticString(length: number): string {
        return this.generate(length, RandomStringGenerator.ALPHABETIC_CHARSET);
    }


    public generateAlphaNumericString(length: number): string {
        return this.generate(length, RandomStringGenerator.ALPHA_NUMERIC_CHARSET);
    }


    public generateHexString(length: number): string {
        return this.generate(length, RandomStringGenerator.HEX_CHARSET);
    }
}
