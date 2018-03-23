import {DigitShapes} from './types';
import {Cloneable} from '../../core/main/Cloneable';
import {Type} from '../../core/main/Type';


export class NumberFormatInfo implements Cloneable<NumberFormatInfo> {
    /**
     * Gets a read-only NumberFormatInfo that formats values based on the current culture.
     */
    public static readonly currentInfo: NumberFormatInfo;

    /**
     * Gets a read-only NumberFormatInfo reflection that is culture-independent (invariant).
     */
    public static readonly invariantInfo: NumberFormatInfo = new NumberFormatInfo();

    /**
     * Gets or sets the number of decimal places to use in currency values.
     */
    public currencyDecimalDigits: number = 2;

    /**
     * Gets or sets the string to use as the decimal separator in currency values.
     */
    public currencyDecimalSeparator: string = '.';

    /**
     * Gets or sets the string that separates groups of digits to the left of the decimal in currency values.
     */
    public currencyGroupSeparator: string = ',';

    /**
     * Gets or sets the number of digits in each group to the left of the decimal in currency values.
     */
    public currencyGroupSizes: number[] = [3];

    /**
     * Gets or sets the format pattern for negative currency values.
     */
    public currencyNegativePattern: string = '($n)';

    /**
     * Gets or sets the format pattern for positive currency values.
     */
    public currencyPositivePattern: string = '$n';

    /**
     * Gets or sets the string to use as the currency symbol.
     */
    public currencySymbol: string = '¤';

    /**
     * Gets or sets a value that specifies how the graphical user interface displays the shape of a digit.
     */
    public digitSubstitution: DigitShapes;

    /**
     * Gets or sets the string that represents the IEEE NaN (not a number) value.
     */
    public nanSymbol: string = 'NaN';

    /**
     * Gets or sets a string array of native digits equivalent to the Western digits 0 through 9.
     */
    public nativeDigits: string[] = '0123456789'.split('');

    /**
     * Gets or sets the string that represents negative infinity.
     */
    public negativeInfinitySymbol: string = '-Infinity';

    /**
     * Gets or sets the string that denotes that the associated number is negative.
     */
    public negativeSign: string = '-';

    /**
     * Gets or sets the number of decimal places to use in numeric values.
     */
    public numberDecimalDigits: number = 2;

    /**
     * Gets or sets the string to use as the decimal separator in numeric values.
     */
    public numberDecimalSeparator: string = '.';

    /**
     * Gets or sets the string that separates groups of digits to the left of the decimal in numeric values.
     */
    public numberGroupSeparator: string = ',';

    /**
     * Gets or sets the number of digits in each group to the left of the decimal in numeric values.
     */
    public numberGroupSizes: number[] = [3];

    /**
     * Gets or sets the format pattern for negative numeric values.
     */
    public numberNegativePattern: string = '-n';

    /**
     * Gets or sets the number of decimal places to use in percent values.
     */
    public percentDecimalDigits: number = 2;

    /**
     * Gets or sets the string to use as the decimal separator in percent values.
     */
    public percentDecimalSeparator: string = '.';

    /**
     * Gets or sets the string that separates groups of digits to the left of the decimal in percent values.
     */
    public percentGroupSeparator: string = ',';

    /**
     * Gets or sets the number of digits in each group to the left of the decimal in percent values.
     */
    public percentGroupSizes: number[] = [3];

    /**
     * Gets or sets the format pattern for negative percent values.
     */
    public percentNegativePattern: string = '-n %';

    /**
     * Gets or sets the format pattern for positive percent values.
     */
    public percentPositivePattern: string = 'n %';

    /**
     * Gets or sets the string to use as the percent symbol.
     */
    public percentSymbol: string = '%';

    /**
     * Gets or sets the string to use as the per mille symbol.
     */
    public perMilleSymbol: string = '‰';

    /**
     * Gets or sets the string that represents positive infinity.
     */
    public positiveInfinitySymbol: string = 'Infinity';

    /**
     * Gets or sets the string that denotes that the associated number is positive.
     */
    public positiveSign: string = '+';


    public constructor(formatInfo?: NumberFormatInfo) {
        if (formatInfo) {
            Object.assign(this, formatInfo);
        }
    }


    public clone(): NumberFormatInfo {
        return new NumberFormatInfo(this);
    }


    public getFormat(type: Type): object | null {
        if (type === NumberFormatInfo) {
            return this;
        } else {
            return null;
        }
    }
}

