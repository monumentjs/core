import { ToString } from '@monument/core';
import { CollectionUtils, ReadOnlyCollection } from '@monument/collections';
import { RegExpUtils } from './RegExpUtils';

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

  static isEmpty(value: string): boolean {
    return value === '';
  }

  /**
   * Check whether the given {@code String} contains actual <em>text</em>.
   * <p>More specifically, this method returns {@code true} if the
   * {@code String} is not {@code null}, its length is greater than 0,
   * and it contains at least one non-whitespace character.
   */
  static hasText(value: string): boolean {
    return value.length > 0 && /[^\s]/.test(value);
  }

  static getCharacters(input: string): string[] {
    return input.split('');
  }

  static split(value: string, delimiters: string, trimTokens: boolean = true, ignoreEmptyTokens: boolean = true): string[] {
    const delimiterPatternEntries: string[] = this.getDelimitersPatternEntries(delimiters);
    const delimiterPatternString: string = this.getDelimitersPatternString(delimiterPatternEntries);
    const delimiterPattern: RegExp = this.getDelimitersPattern(delimiterPatternString);
    let tokens: string[] = value.split(delimiterPattern);

    if (trimTokens) {
      tokens = tokens.map(token => token.trim());
    }

    if (ignoreEmptyTokens) {
      tokens = tokens.filter(token => token !== '');
    }

    return tokens;
  }

  static trimLeft(value: string): string {
    return value.replace(StringUtils.LEADING_WHITESPACE_PATTERN, '');
  }

  static trimRight(value: string): string {
    return value.replace(StringUtils.TRAILING_WHITESPACE_PATTERN, '');
  }

  static trim(value: string): string {
    return value.trim();
  }

  static isUpperCase(value: string): boolean {
    return value === value.toUpperCase();
  }

  static isLowerCase(value: string): boolean {
    return value === value.toLowerCase();
  }

  static collectionToDelimitedString(
    values: ReadOnlyCollection<ToString>,
    delimiter: string,
    prefix: string = '',
    suffix: string = ''
  ): string {
    if (values.isEmpty) {
      return '';
    }

    return values
      .toArray()
      .map(item => {
        return `${prefix}${item.toString()}${suffix}`;
      })
      .join(delimiter);
  }

  static toCamelCase(input: string): string {
    let slices: string[] = this.getWords(input);

    slices = slices.map((slice: string, index: number): string => {
      const firstChar: string = slice[0];

      if (index === 0) {
        return firstChar.toLowerCase() + slice.slice(1).toLowerCase();
      } else {
        return firstChar.toUpperCase() + slice.slice(1).toLowerCase();
      }
    });

    return slices.join('');
  }

  static toCapitalCase(input: string): string {
    let slices: string[] = this.getWords(input);

    slices = slices.map((slice: string): string => {
      const firstChar: string = slice[0];

      return firstChar.toUpperCase() + slice.slice(1).toLowerCase();
    });

    return slices.join('');
  }

  static toKebabCase(input: string): string {
    const slices: string[] = this.getWords(input);

    return slices.join(this.KEBAB_CASE_DELIMITER).toLowerCase();
  }

  static toSnakeCase(input: string): string {
    const slices: string[] = this.getWords(input);

    return slices.join(this.SNAKE_CASE_DELIMITER).toLowerCase();
  }

  static padStart(input: string, length: number, padString: string = ' '): string {
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

  static padEnd(input: string, length: number, padString: string = ' '): string {
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

  static clipStart(input: string, length: number): string {
    CollectionUtils.validateLength(length);

    if (input.length > length) {
      return input.substring(0, length);
    }

    return input;
  }

  static clipEnd(input: string, length: number): string {
    CollectionUtils.validateLength(length);

    if (input.length > length) {
      return input.substring(input.length - length);
    }

    return input;
  }

  static getWords(input: string): string[] {
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
    return delimiters.split('').map(ch => RegExpUtils.escape(ch));
  }

  private static getDelimitersPatternString(delimiterPatternEntries: string[]): string {
    return delimiterPatternEntries.join('|');
  }

  private static getDelimitersPattern(delimiterPatternString: string): RegExp {
    return new RegExp(delimiterPatternString, 'g');
  }
}
