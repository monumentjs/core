import { Parser } from './Parser';
import { FormatException } from '@monument/core';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class FloatParser implements Parser<number> {
  private static readonly WEAK_FLOAT_VALUE_PATTERN = /^\d*\.?\d+/;
  private static readonly STRICT_FLOAT_VALUE_PATTERN = /^\d*\.?\d+$/;
  static readonly WEAK: FloatParser = new FloatParser(false);
  static readonly STRICT: FloatParser = new FloatParser(true);
  private readonly _isStrict: boolean;

  get isStrict(): boolean {
    return this._isStrict;
  }

  constructor(isStrict: boolean = false) {
    this._isStrict = isStrict;
  }

  canParse(source: string): boolean {
    if (this.isStrict) {
      return FloatParser.STRICT_FLOAT_VALUE_PATTERN.test(source);
    } else {
      return FloatParser.WEAK_FLOAT_VALUE_PATTERN.test(source);
    }
  }

  parse(source: string): number {
    if (!this.canParse(source)) {
      throw new FormatException('Value cannot be converted to boolean');
    }

    return parseFloat(source);
  }
}
