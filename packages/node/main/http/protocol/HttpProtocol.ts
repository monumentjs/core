import {Comparable} from '@monument/core/main/Comparable';
import {Equatable} from 'packages/core/main/utils/comparison/Equatable';
import {ComparisonResult} from '@monument/core/main/ComparisonResult';
import {NumberComparator} from '@monument/core/main/utils/NumberComparator';
import {HttpVersion} from './HttpVersion';

/**
 * @immutable
 */
export class HttpProtocol implements HttpVersion, Comparable<HttpProtocol>, Equatable<HttpProtocol> {
    public static readonly HTTP_1_0: HttpProtocol = new HttpProtocol(1, 0);
    public static readonly HTTP_1_1: HttpProtocol = new HttpProtocol(1, 1);
    public static readonly HTTP_2_0: HttpProtocol = new HttpProtocol(2, 0);

    public static readonly DEFAULT: HttpProtocol = HttpProtocol.HTTP_1_1;

    private readonly _numberComparator: NumberComparator = new NumberComparator();

    public readonly major: number;
    public readonly minor: number;

    private constructor(major: number, minor: number) {
        this.major = major;
        this.minor = minor;
    }

    public compareTo(other: HttpProtocol): ComparisonResult {
        const major: ComparisonResult = this._numberComparator.compare(this.major, other.major);
        const minor: ComparisonResult = this._numberComparator.compare(this.minor, other.minor);

        if (major !== ComparisonResult.EQUALS) {
            return major;
        }

        if (minor !== ComparisonResult.EQUALS) {
            return minor;
        }

        return ComparisonResult.EQUALS;
    }

    public equals(other: HttpProtocol): boolean {
        return this.compareTo(other) === ComparisonResult.EQUALS;
    }
}
