import { Parser } from './Parser';
import { FormatException } from '../../exceptions/FormatException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class IntParser implements Parser<number> {
  private static readonly WEAK_FLOAT_VALUE_PATTERN = /^\d+/;
  private static readonly STRICT_FLOAT_VALUE_PATTERN = /^\d+$/;
  static readonly WEAK: IntParser = new IntParser(false);
  static readonly STRICT: IntParser = new IntParser(true);
  private readonly _isStrict: boolean;
  private readonly _radix: number;

  get isStrict(): boolean {
    return this._isStrict;
  }

  get radix(): number {
    return this._radix;
  }

  constructor(isStrict: boolean = false, radix: number = 10) {
    this._isStrict = isStrict;
    this._radix = radix;
  }

  canParse(source: string): boolean {
    if (this.isStrict) {
      return IntParser.STRICT_FLOAT_VALUE_PATTERN.test(source);
    } else {
      return IntParser.WEAK_FLOAT_VALUE_PATTERN.test(source);
    }
  }

  parse(source: string): number {
    if (!this.canParse(source)) {
      throw new FormatException('Value cannot be converted to boolean');
    }

    return parseInt(source, this.radix);
  }
}
