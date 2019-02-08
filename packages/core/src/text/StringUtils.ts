import { EMPTY_STRING, SPACE } from './Strings';
import { RegExpUtils } from './RegExpUtils';
import { CollectionUtils } from '../collections/base/CollectionUtils';
import { ReadOnlyCollection } from '../collections/collection/readonly/ReadOnlyCollection';
import { ToString } from '../base/ToString';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class StringUtils {
    private static readonly LEADING_WHITESPACE_PATTERN: RegExp = /^\s+/g;
    private static readonly TRAILING_WHITESPACE_PATTERN: RegExp = /\s+$/g;
    private static readonly PUNCTUATION_CHARACTERS: string = `\r\n\t\v .,\//|@#!?$%^&*;:=-_+\`'"~{}[]()`;
    private static readonly KEBAB_CASE_DELIMITER: string = '-';
    private static readonly SNAKE_CASE_DELIMITER: string = '_';

    public static isEmpty(value: string): boolean {
        return value === EMPTY_STRING;
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
        return input.split(EMPTY_STRING);
    }

    public static split(value: string, delimiters: string, trimTokens: boolean = true, ignoreEmptyTokens: boolean = true): string[] {
        const delimiterPatternEntries: string[] = this.getDelimitersPatternEntries(delimiters);
        const delimiterPatternString: string = this.getDelimitersPatternString(delimiterPatternEntries);
        const delimiterPattern: RegExp = this.getDelimitersPattern(delimiterPatternString);
        let tokens: string[] = value.split(delimiterPattern);

        if (trimTokens) {
            tokens = tokens.map(token => token.trim());
        }

        if (ignoreEmptyTokens) {
            tokens = tokens.filter(token => token !== EMPTY_STRING);
        }

        return tokens;
    }

    public static trimLeft(value: string): string {
        return value.replace(StringUtils.LEADING_WHITESPACE_PATTERN, EMPTY_STRING);
    }

    public static trimRight(value: string): string {
        return value.replace(StringUtils.TRAILING_WHITESPACE_PATTERN, EMPTY_STRING);
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
        values: ReadOnlyCollection<ToString>,
        delimiter: string,
        prefix: string = EMPTY_STRING,
        suffix: string = EMPTY_STRING
    ): string {
        if (values.isEmpty) {
            return EMPTY_STRING;
        }

        return values
            .toArray()
            .map(item => {
                return `${prefix}${item.toString()}${suffix}`;
            })
            .join(delimiter);
    }

    public static toCamelCase(input: string): string {
        let slices: string[] = this.getWords(input);

        slices = slices.map(
            (slice: string, index: number): string => {
                const firstChar: string = slice[0];

                if (index === 0) {
                    return firstChar.toLowerCase() + slice.slice(1).toLowerCase();
                } else {
                    return firstChar.toUpperCase() + slice.slice(1).toLowerCase();
                }
            }
        );

        return slices.join(EMPTY_STRING);
    }

    public static toCapitalCase(input: string): string {
        let slices: string[] = this.getWords(input);

        slices = slices.map(
            (slice: string): string => {
                const firstChar: string = slice[0];

                return firstChar.toUpperCase() + slice.slice(1).toLowerCase();
            }
        );

        return slices.join(EMPTY_STRING);
    }

    public static toKebabCase(input: string): string {
        const slices: string[] = this.getWords(input);

        return slices.join(this.KEBAB_CASE_DELIMITER).toLowerCase();
    }

    public static toSnakeCase(input: string): string {
        const slices: string[] = this.getWords(input);

        return slices.join(this.SNAKE_CASE_DELIMITER).toLowerCase();
    }

    public static padStart(input: string, length: number, padString: string = SPACE): string {
        CollectionUtils.validateLength(length);

        if (input.length > length) {
            return input;
        } else {
            const paddingLength: number = length - input.length;
            let padding: string = padString;

            if (paddingLength > padString.length) {
                padding += padString.repeat(paddingLength / padString.length);
            }

            return padding.slice(0, paddingLength) + input;
        }
    }

    public static padEnd(input: string, length: number, padString: string = SPACE): string {
        CollectionUtils.validateLength(length);

        if (input.length > length) {
            return input;
        } else {
            const paddingLength: number = length - input.length;
            let padding: string = padString;

            if (paddingLength > padString.length) {
                padding += padString.repeat(paddingLength / padString.length);
            }

            return input + padding.slice(0, paddingLength);
        }
    }

    public static clipStart(input: string, length: number): string {
        CollectionUtils.validateLength(length);

        if (input.length > length) {
            return input.substring(0, length);
        }

        return input;
    }

    public static clipEnd(input: string, length: number): string {
        CollectionUtils.validateLength(length);

        if (input.length > length) {
            return input.substring(input.length - length);
        }

        return input;
    }

    public static getWords(input: string): string[] {
        const slices: string[] = this.split(input, this.PUNCTUATION_CHARACTERS);
        const words: string[] = [];

        slices.forEach((slice: string) => {
            let upperCasedSeqLength: number = 0;
            let cursor: number = 0;

            Array.prototype.forEach.call(slice, (char: string, index: number) => {
                if (this.isUpperCase(char)) {
                    if (upperCasedSeqLength === 0) {
                        const word: string = slice.slice(cursor, index);

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
        return delimiters.split(EMPTY_STRING).map(ch => RegExpUtils.escape(ch));
    }

    private static getDelimitersPatternString(delimiterPatternEntries: string[]): string {
        return delimiterPatternEntries.join('|');
    }

    private static getDelimitersPattern(delimiterPatternString: string): RegExp {
        return new RegExp(delimiterPatternString, 'g');
    }
}
