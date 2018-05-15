import {Assert} from '@monument/assert/main/Assert';
import {StringPool} from '@monument/core/main/StringPool';
import {Collection} from '@monument/collections/main/Collection';
import {RegExpUtils} from './RegExpUtils';


export class StringUtils {
    private static readonly LEADING_WHITESPACE_PATTERN: RegExp = /^\s+/g;
    private static readonly TRAILING_WHITESPACE_PATTERN: RegExp = /\s+$/g;
    private static readonly PUNCTUATION_CHARACTERS: string = `\r\n\t\v .,\//|@#!?$%^&*;:=-_+\`'"~{}[]()`;
    private static readonly KEBAB_CASE_DELIMITER: string = '-';
    private static readonly SNAKE_CASE_DELIMITER: string = '_';


    public static isEmpty(value: string): boolean {
        return value === StringPool.BLANK;
    }


    /**
     * Check whether the given {@code String} contains actual <em>text</em>.
     * <p>More specifically, this method returns {@code true} if the
     * {@code String} is not {@code null}, its length is greater than 0,
     * and it contains at least one non-whitespace character.
     */
    public static hasText(value: string): boolean {
        return value.length > 0 && /[^\s]/.test(value);
    }


    public static getCharacters(input: string): string[] {
        return input.split(StringPool.BLANK);
    }


    public static split(
        value: string,
        delimiters: string,
        trimTokens: boolean = true,
        ignoreEmptyTokens: boolean = true
    ): string[] {
        let delimiterPatternEntries: string[] = this.getDelimitersPatternEntries(delimiters);
        let delimiterPatternString: string = this.getDelimitersPatternString(delimiterPatternEntries);
        let delimiterPattern: RegExp = this.getDelimitersPattern(delimiterPatternString);
        let tokens: string[] = value.split(delimiterPattern);

        if (trimTokens) {
            tokens = tokens.map((token) => token.trim());
        }

        if (ignoreEmptyTokens) {
            tokens = tokens.filter((token) => token !== StringPool.BLANK);
        }

        return tokens;
    }


    public static trimLeft(value: string): string {
        return value.replace(StringUtils.LEADING_WHITESPACE_PATTERN, StringPool.BLANK);
    }


    public static trimRight(value: string): string {
        return value.replace(StringUtils.TRAILING_WHITESPACE_PATTERN, StringPool.BLANK);
    }


    public static trim(value: string): string {
        return value.trim();
    }


    public static isUpperCase(value: string): boolean {
        return value === value.toUpperCase();
    }


    public static isLowerCase(value: string): boolean {
        return value === value.toLowerCase();
    }


    public static collectionToDelimitedString(
        values: Collection<any>,
        delimiter: string,
        prefix: string = StringPool.BLANK,
        suffix: string = StringPool.BLANK
    ): string {
        if (values.isEmpty) {
            return StringPool.BLANK;
        }

        return values.toArray().map((item) => {
            return `${prefix}${String(item)}${suffix}`;
        }).join(delimiter);
    }


    public static toCamelCase(input: string): string {
        let slices: string[] = this.getWords(input);

        slices = slices.map((slice: string, index: number): string => {
            let firstChar: string = slice[0];

            if (index === 0) {
                return firstChar.toLowerCase() + slice.slice(1).toLowerCase();
            } else {
                return firstChar.toUpperCase() + slice.slice(1).toLowerCase();
            }
        });

        return slices.join(StringPool.BLANK);
    }


    public static toCapitalCase(input: string): string {
        let slices: string[] = this.getWords(input);

        slices = slices.map((slice: string): string => {
            let firstChar: string = slice[0];

            return firstChar.toUpperCase() + slice.slice(1).toLowerCase();
        });

        return slices.join(StringPool.BLANK);
    }


    public static toKebabCase(input: string): string {
        let slices: string[] = this.getWords(input);

        return slices.join(this.KEBAB_CASE_DELIMITER).toLowerCase();
    }


    public static toSnakeCase(input: string): string {
        let slices: string[] = this.getWords(input);

        return slices.join(this.SNAKE_CASE_DELIMITER).toLowerCase();
    }


    public static padStart(input: string, length: number, padString: string = ' '): string {
        Assert.argument('length', length).isLength();

        if (input.length > length) {
            return input;
        } else {
            length = length - input.length;

            if (length > padString.length) {
                padString += padString.repeat(length / padString.length);
            }

            return padString.slice(0, length) + input;
        }
    }


    public static padEnd(input: string, length: number, padString: string = ' '): string {
        Assert.argument('length', length).isLength();

        if (input.length > length) {
            return input;
        } else {
            length = length - input.length;

            if (length > padString.length) {
                padString += padString.repeat(length / padString.length);
            }

            return input + padString.slice(0, length);
        }
    }


    public static clipStart(input: string, length: number): string {
        Assert.argument('length', length).isLength();

        if (input.length > length) {
            return input.substring(0, length);
        }

        return input;
    }


    public static clipEnd(input: string, length: number): string {
        Assert.argument('length', length).isLength();

        if (input.length > length) {
            return input.substring(input.length - length);
        }

        return input;
    }


    public static getWords(input: string): string[] {
        let slices: string[] = this.split(input, this.PUNCTUATION_CHARACTERS);
        let words: string[] = [];

        slices.forEach((slice: string) => {
            let upperCasedSeqLength: number = 0;
            let cursor: number = 0;

            Array.prototype.forEach.call(slice, (char: string, index: number) => {
                if (this.isUpperCase(char)) {
                    if (upperCasedSeqLength === 0) {
                        let word: string = slice.slice(cursor, index);

                        if (word.length > 0) {
                            words.push(word);
                        }

                        cursor = index;
                    }

                    upperCasedSeqLength++;
                } else {
                    upperCasedSeqLength = 0;
                }
            });

            if (cursor < slice.length) {
                words.push(slice.slice(cursor));
            }
        });

        return words;
    }


    private static getDelimitersPatternEntries(delimiters: string): string[] {
        return delimiters.split(StringPool.BLANK).map((ch) => RegExpUtils.escape(ch));
    }


    private static getDelimitersPatternString(delimiterPatternEntries: string[]): string {
        return delimiterPatternEntries.join('|');
    }


    private static getDelimitersPattern(delimiterPatternString: string): RegExp {
        return new RegExp(delimiterPatternString, 'g');
    }
}
