import {Collection} from '../../../../collections/main/Collection';
import {List} from '../../../../collections/main/List';
import {ArrayList} from '../../../../collections/main/ArrayList';
import {Assert} from '../../../../core/Assertion/Assert';
import {StringBuilder} from '../../../../text/main/StringBuilder';
import {NullSafeEqualityComparator} from '../../../../core/main/NullSafeEqualityComparator';
import {InvalidArgumentException} from '../../../../core/main/exceptions/InvalidArgumentException';
import {StringUtils} from '../../../../text/main/StringUtils';
import {Equatable} from '../../../../core/main/Equatable';


export abstract class HttpRange {
    private static readonly BYTE_RANGE_PREFIX: string = 'bytes=';

    /**
     * Create a {@code HttpRange} from the given fist to last position.
     * @param firstBytePos the first byte position
     * @param lastBytePos the last byte position
     * @return a byte range that ranges from {@code firstPos} till {@code lastPos}
     * @see <a href="http://tools.ietf.org/html/rfc7233#section-2.1">Byte Ranges</a>
     */
    public static createByteRange(firstBytePos: number, lastBytePos?: number): HttpRange {
        return new HttpRange.ByteRange(firstBytePos, lastBytePos);
    }

    /**
     * Create an {@code HttpRange} that ranges over the last given number of bytes.
     * @param suffixLength the number of bytes for the range
     * @return a byte range that ranges over the last {@code suffixLength} number of bytes
     * @see <a href="http://tools.ietf.org/html/rfc7233#section-2.1">Byte Ranges</a>
     */
    public static createSuffixRange(suffixLength: number): HttpRange {
        return new HttpRange.SuffixByteRange(suffixLength);
    }

    /**
     * Parse the given, comma-separated string into a list of {@code HttpRange} objects.
     * <p>This method can be used to push an {@code Range} header.
     * @param ranges the string to push
     * @return the list of ranges
     * @throws IllegalArgumentException if the string cannot be parsed
     */
    public static parseRanges(ranges: string): List<HttpRange> {
        if (ranges.length === 0) {
            return new ArrayList();
        }

        if (!ranges.startsWith(HttpRange.BYTE_RANGE_PREFIX)) {
            throw new InvalidArgumentException('ranges', `Range "${ranges}" does not start with 'bytes='`);
        }

        ranges = ranges.substring(HttpRange.BYTE_RANGE_PREFIX.length);

        const tokens: string[] = StringUtils.split(ranges, ',');
        const result: List<HttpRange> = new ArrayList();

        for (const token of tokens) {
            result.add(this.parseRange(token));
        }

        return result;
    }

    /**
     * Return a string representation of the given list of {@code HttpRange} objects.
     * <p>This method can be used to for an {@code Range} header.
     * @param ranges the ranges to create a string of
     * @return the string representation
     */
    public static toString(ranges: Collection<HttpRange>): string {
        if (ranges.isEmpty) {
            throw new InvalidArgumentException('ranges', 'Ranges Collection must not be empty');
        }

        let serialized: string = ranges.toArray().map((range) => {
            return range.toString();
        }).join(', ');

        return `${HttpRange.BYTE_RANGE_PREFIX}${serialized}`;
    }


    private static parseRange(range: string): HttpRange {
        Assert.argument('range', range).notEmptyString();

        let dashIdx: number = range.indexOf('-');

        if (dashIdx > 0) {
            let firstPos: number = parseInt(range.substring(0, dashIdx), 10);

            if (dashIdx < range.length - 1) {
                let lastPos: any = parseInt(range.substring(dashIdx + 1, range.length), 10);

                return new HttpRange.ByteRange(firstPos, lastPos);
            } else {
                return new HttpRange.ByteRange(firstPos);
            }
        } else if (dashIdx === 0) {
            let suffixLength: any = parseInt(range.substring(1), 10);

            return new HttpRange.SuffixByteRange(suffixLength);
        } else {
            throw new InvalidArgumentException('range', `Range "${range}" does not contain "-"`);
        }
    }

    /**
     * Return the run of the range given the total length of a representation.
     * @param length the length of the representation
     * @return the run of this range for the representation
     */
    public abstract getRangeStart(length: number): number;

    /**
     * Return the end of the range (inclusive) given the total length of a representation.
     * @param length the length of the representation
     * @return the end of the range for the representation
     */
    public abstract getRangeEnd(length: number): number;
}


/*tslint:disable:max-classes-per-file*/
export namespace HttpRange {
    /**
     * Represents an HTTP/1.1 suffix byte range, with a number of suffix bytes.
     * @see <a href="http://tools.ietf.org/html/rfc7233#section-2.1">Byte Ranges</a>
     * @see HttpRange#createSuffixRange(long)
     */
    export class SuffixByteRange extends HttpRange implements Equatable<HttpRange> {
        private readonly suffixLength: number;


        public constructor(suffixLength: number) {
            super();

            Assert.argument('suffixLength', suffixLength).isLength();

            this.suffixLength = suffixLength;
        }


        public getRangeStart(length: number): number {
            if (this.suffixLength < length) {
                return length - this.suffixLength;
            } else {
                return 0;
            }
        }


        public getRangeEnd(length: number): number {
            return length - 1;
        }


        public equals(other: HttpRange): boolean {
            if (this === other) {
                return true;
            }

            if (other instanceof SuffixByteRange) {
                let otherSuffixLength: number = (other as SuffixByteRange).suffixLength;

                return this.suffixLength === otherSuffixLength;
            }

            return false;
        }


        public toString(): string {
            return `-${this.suffixLength}`;
        }
    }


    /**
     * Represents an HTTP/1.1 byte range, with a first and optional last position.
     * @see <a href="http://tools.ietf.org/html/rfc7233#section-2.1">Byte Ranges</a>
     * @see HttpRange#createByteRange(long)
     * @see HttpRange#createByteRange(long, long)
     */
    export class ByteRange extends HttpRange implements Equatable<HttpRange> {
        private readonly firstPosition: number;
        private readonly lastPosition: number | undefined;


        public constructor(firstPosition: number, lastPosition?: number) {
            super();

            this.assertPositions(firstPosition, lastPosition);

            this.firstPosition = firstPosition;
            this.lastPosition = lastPosition;
        }


        public getRangeStart(length: number): number {
            return this.firstPosition;
        }


        public getRangeEnd(length: number): number {
            if (this.lastPosition != null && this.lastPosition < length) {
                return this.lastPosition;
            } else {
                return length - 1;
            }
        }


        public equals(other: HttpRange): boolean {
            if (this === other) {
                return true;
            }

            if (other instanceof ByteRange) {
                let otherFirstPosition: number = (other as ByteRange).firstPosition;
                let otherLastPosition: number | undefined = (other as ByteRange).lastPosition;

                return (
                    this.firstPosition === otherFirstPosition &&
                    NullSafeEqualityComparator.instance.equals(this.lastPosition, otherLastPosition)
                );
            }

            return false;
        }


        public toString(): string {
            let builder: StringBuilder = new StringBuilder();

            builder.append(this.firstPosition.toString(10));
            builder.append('-');

            if (this.lastPosition != null) {
                builder.append(this.lastPosition.toString(10));
            }

            return builder.toString();
        }


        private assertPositions(firstBytePos: number, lastBytePos: number | undefined): void {
            Assert.argument('firstBytePos', firstBytePos).isIndex();

            if (lastBytePos != null && lastBytePos < firstBytePos) {
                Assert.range(firstBytePos, lastBytePos).ofArguments('firstBytePos', 'lastBytePos');
            }
        }
    }
}
