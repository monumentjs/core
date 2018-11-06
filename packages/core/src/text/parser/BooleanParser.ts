import {Parser} from './Parser';
import {FormatException} from '../../exceptions/FormatException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class BooleanParser implements Parser<boolean> {
    private static readonly WEAK_TRUE_VALUE_PATTERN = /^true|1$/i;
    private static readonly WEAK_BOOLEAN_VALUE_PATTERN = /^false|true|1|0$/i;
    private static readonly STRICT_TRUE_VALUE_PATTERN = /^true$/i;
    private static readonly STRICT_BOOLEAN_VALUE_PATTERN = /^false|true$/i;
    public static readonly WEAK: BooleanParser = new BooleanParser(false);
    public static readonly STRICT: BooleanParser = new BooleanParser(true);
    private readonly _isStrict: boolean;

    public get isStrict(): boolean {
        return this._isStrict;
    }

    public constructor(isStrict: boolean = false) {
        this._isStrict = isStrict;
    }

    public canParse(source: string): boolean {
        if (this.isStrict) {
            return BooleanParser.STRICT_BOOLEAN_VALUE_PATTERN.test(source);
        } else {
            return BooleanParser.WEAK_BOOLEAN_VALUE_PATTERN.test(source);
        }
    }

    public parse(source: string): boolean {
        if (!this.canParse(source)) {
            throw new FormatException('Value cannot be converted to boolean');
        }

        if (this.isStrict) {
            return BooleanParser.STRICT_TRUE_VALUE_PATTERN.test(source);
        } else {
            return BooleanParser.WEAK_TRUE_VALUE_PATTERN.test(source);
        }
    }

}
