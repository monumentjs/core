import {DateTime} from '@monument/time/main/DateTime';
import {NullSafeEqualityComparator} from '@monument/core/main/NullSafeEqualityComparator';
import {StringBuilder} from '@monument/text/main/StringBuilder';
import {InvariantDateTimeFormatInfo} from '@monument/time/main/InvariantDateTimeFormatInfo';
import {List} from '@monument/collections/main/List';
import {DateTimeParser} from '@monument/time/main/DateTimeParser';
import {InvalidArgumentException} from '@monument/core/main/exceptions/InvalidArgumentException';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {EMPTY_STRING} from '@monument/core/main/constants';
import {Assert} from '@monument/assert/main/Assert';
import {Encoding} from '@monument/system/main/encoding/Encoding';


/**
 * Represent the Content-Disposition type and parameters as defined in RFC 2183.
 */
export class ContentDisposition {

    /**
     * Return a builder for a {@code ContentDisposition}.
     * @param type the disposition type like for example {@literal inline},
     * {@literal attachment}, or {@literal form-data}
     * @return the builder
     */
    public static builder(type: string): ContentDisposition.Builder {
        return new ContentDisposition.BuilderImpl(type);
    }


    /**
     * Return an empty content disposition.
     */
    public static empty(): ContentDisposition {
        return new ContentDisposition(EMPTY_STRING);
    }


    /**
     * Parse a {@literal Content-Disposition} header value as defined in RFC 2183.
     * @param contentDisposition the {@literal Content-Disposition} header value
     * @return the parsed content disposition
     * @see #toString()
     */
    public static parse(contentDisposition: string): ContentDisposition {
        let parts: List<string> = this.tokenize(contentDisposition);
        let type: string = parts.getAt(0);
        let name: string | undefined;
        let filename: string | undefined;
        let charset: Encoding | undefined;
        let size: number | undefined;
        let creationDate: DateTime | undefined;
        let modificationDate: DateTime | undefined;
        let readDate: DateTime | undefined;

        for (let i = 1; i < parts.length; i++) {
            let part: string = parts.getAt(i);
            let eqIndex: number = part.indexOf('=');

            if (eqIndex !== -1) {
                let attribute: string = part.substring(0, eqIndex);
                let value: string = (
                    part.startsWith('"', eqIndex + 1) && part.endsWith('"') ?
                        part.substring(eqIndex + 2, part.length - 1) :
                        part.substring(eqIndex + 1, part.length)
                );

                if (attribute === 'name') {
                    name = value;
                } else if (attribute === 'filename*') {
                    filename = this.decodeHeaderFieldParam(value);
                    charset = Encoding.getByWebName(value.substring(0, value.indexOf('\'')));
                    Assert.isTrue(
                        Encoding.UTF_8 === charset || Encoding.ISO_8859_1 === charset,
                        'Charset should be UTF-8 or ISO-8859-1'
                    );
                } else if (attribute === 'filename' && filename == null) {
                    filename = value;
                } else if (attribute === 'size') {
                    size = parseInt(value, 10);
                } else if (attribute === 'creation-date') {
                    try {
                        creationDate = DateTimeParser.instance.parse(
                            value,
                            InvariantDateTimeFormatInfo.invariant.rfc1123Pattern
                        );
                    } catch (ex) {
                        // ignore
                    }
                } else if (attribute === 'modification-date') {
                    try {
                        modificationDate = DateTimeParser.instance.parse(
                            value,
                            InvariantDateTimeFormatInfo.invariant.rfc1123Pattern
                        );
                    } catch (ex) {
                        // ignore
                    }
                } else if (attribute === 'read-date') {
                    try {
                        readDate = DateTimeParser.instance.parse(
                            value,
                            InvariantDateTimeFormatInfo.invariant.rfc1123Pattern
                        );
                    } catch (ex) {
                        // ignore
                    }
                }
            } else {
                throw new InvalidArgumentException('contentDisposition', 'Invalid content disposition format');
            }
        }

        return new ContentDisposition(type, name, filename, charset, size, creationDate, modificationDate, readDate);
    }


    private static tokenize(headerValue: string): List<string> {
        let index: number = headerValue.indexOf(';');
        let type: string = (index >= 0 ? headerValue.substring(0, index) : headerValue).trim();

        if (type.length === 0) {
            throw new InvalidArgumentException('headerValue', 'Content-Disposition header must not be empty.');
        }

        let parts: List<string> = new ArrayList();

        parts.add(type);

        if (index >= 0) {
            do {
                let nextIndex: number = index + 1;
                let quoted: boolean = false;

                while (nextIndex < headerValue.length) {
                    let ch: string = headerValue.charAt(nextIndex);

                    if (ch === ';') {
                        if (!quoted) {
                            break;
                        }
                    } else if (ch === '"') {
                        quoted = !quoted;
                    }

                    nextIndex++;
                }

                let part: string = headerValue.substring(index + 1, nextIndex).trim();

                if (part.length > 0) {
                    parts.add(part);
                }

                index = nextIndex;
            } while (index < headerValue.length);
        }

        return parts;
    }


    /**
     * Decode the given header field param as describe in RFC 5987.
     * <p>Only the US-ASCII, UTF-8 and ISO-8859-1 charsets are supported.
     * @param input the header field param
     * @return the encoded header field param
     * @see <a href="https://tools.ietf.org/html/rfc5987">RFC 5987</a>
     */
    private static decodeHeaderFieldParam(input: string): string {
        let firstQuoteIndex: number = input.indexOf('\'');
        let secondQuoteIndex: number = input.indexOf('\'', firstQuoteIndex + 1);
        // US_ASCII
        if (firstQuoteIndex < 0 || secondQuoteIndex < 0) {
            return input;
        }

        let charset: Encoding = Encoding.getByWebName(input.substring(0, firstQuoteIndex));

        Assert.isTrue(
            Encoding.UTF_8 === charset || Encoding.ISO_8859_1 === charset,
            'Charset should be UTF-8 or ISO-8859-1'
        );

        let value: Buffer = charset.getBytes(input.substring(secondQuoteIndex + 1, input.length));

        let decodedBytes: number[] = [];
        let index: number = 0;

        let percentChar: number = Encoding.US_ASCII.getBytes('%')[0];

        while (index < value.length) {
            let b: number = value[index];

            if (this.isRFC5987AttrChar(new Buffer([b]).toString())) {
                decodedBytes.push(b);
                index++;
            } else if (b === percentChar) {
                let escapedCharsBytes: Buffer = new Buffer([value[index + 1], value[index + 2]]);
                decodedBytes.push(parseInt(escapedCharsBytes.toString(), 16));
                index += 3;
            } else {
                throw new InvalidArgumentException(
                    'input',
                    'Invalid header field parameter format (as defined in RFC 5987)'
                );
            }
        }

        return charset.getString(new Buffer(decodedBytes));
    }


    private static isRFC5987AttrChar(c: string): boolean {
        return (c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') ||
            c === '!' || c === '#' || c === '$' || c === '&' || c === '+' || c === '-' ||
            c === '.' || c === '^' || c === '_' || c === '`' || c === '|' || c === '~';
    }


    /**
     * Encode the given header field param as describe in RFC 5987.
     * @param input the header field param
     * @param charset the charset of the header field param string,
     * only the US-ASCII, UTF-8 and ISO-8859-1 charsets are supported
     * @return the encoded header field param
     * @see <a href="https://tools.ietf.org/html/rfc5987">RFC 5987</a>
     */
    private static encodeHeaderFieldParam(input: string, charset: Encoding): string {
        if (Encoding.US_ASCII === charset) {
            return input;
        }

        Assert.isTrue(
            Encoding.UTF_8 === charset || Encoding.ISO_8859_1 === charset,
            'Charset should be UTF-8 or ISO-8859-1'
        );

        let source: Buffer = charset.getBytes(input);
        let len: number = source.length;
        let sb: StringBuilder = new StringBuilder(EMPTY_STRING, len << 1);

        sb.append(charset.webName);
        sb.append('\'\'');

        for (let b of source) {
            if (this.isRFC5987AttrChar(new Buffer([b]).toString())) {
                sb.append(new Buffer([b]).toString());
            } else {
                sb.append('%');
                // char hex1 = Character.toUpperCase(Character.forDigit((b >> 4) & 0xF, 16));
                // char hex2 = Character.toUpperCase(Character.forDigit(b & 0xF, 16));
                let hex1: string = ((b >> 4) & 0xF).toString(16).toUpperCase();
                let hex2: string = (b & 0xF).toString(16).toUpperCase();
                sb.append(hex1);
                sb.append(hex2);
            }
        }

        return sb.toString();
    }


    private _type: string | undefined;
    private _name: string | undefined;
    private _filename: string | undefined;
    private _charset: Encoding | undefined;
    private _size: number | undefined;
    private _creationDate: DateTime | undefined;
    private _modificationDate: DateTime | undefined;
    private _readDate: DateTime | undefined;


    public get type(): string | undefined {
        return this._type;
    }


    public get name(): string | undefined {
        return this._name;
    }


    public get filename(): string | undefined {
        return this._filename;
    }


    public get charset(): Encoding | undefined {
        return this._charset;
    }


    public get size(): number | undefined {
        return this._size;
    }


    public get creationDate(): DateTime | undefined {
        return this._creationDate;
    }


    public get modificationDate(): DateTime | undefined {
        return this._modificationDate;
    }


    public get readDate(): DateTime | undefined {
        return this._readDate;
    }


    public constructor(
        type: string, name?: string, filename?: string,
        charset?: Encoding, size?: number, creationDate?: DateTime,
        modificationDate?: DateTime, readDate?: DateTime
    ) {

        this._type = type;
        this._name = name;
        this._filename = filename;
        this._charset = charset;
        this._size = size;
        this._creationDate = creationDate;
        this._modificationDate = modificationDate;
        this._readDate = readDate;
    }


    public equals(other: ContentDisposition) {
        if (this === other) {
            return true;
        }

        return (
            NullSafeEqualityComparator.instance.equals(this.type, other.type) &&
            NullSafeEqualityComparator.instance.equals(this.name, other.name) &&
            NullSafeEqualityComparator.instance.equals(this.filename, other.filename) &&
            NullSafeEqualityComparator.instance.equals(this.charset, other.charset) &&
            NullSafeEqualityComparator.instance.equals(this.size, other.size) &&
            NullSafeEqualityComparator.instance.equals(this.creationDate, other.creationDate) &&
            NullSafeEqualityComparator.instance.equals(this.modificationDate, other.modificationDate) &&
            NullSafeEqualityComparator.instance.equals(this.readDate, other.readDate)
        );
    }


    /**
     * Return the header value for this content disposition as defined in RFC 2183.
     * @see #push(String)
     */
    public toString(): string {
        let sb: StringBuilder = new StringBuilder();

        if (this.type != null) {
            sb.append(this.type);
        }

        if (this.name != null) {
            sb.append(`; name="${this.name}"`);
        }

        if (this.filename != null) {
            if (this.charset == null || this.charset === Encoding.US_ASCII) {
                sb.append(`; filename="${this.filename}"`);
            } else {
                sb.append('; filename*=');
                sb.append(ContentDisposition.encodeHeaderFieldParam(this.filename, this.charset));
            }
        }

        if (this.size != null) {
            sb.append(`; size=${this.size}`);
        }

        if (this.creationDate != null) {
            sb.append('; creation-date="');
            sb.append(this.creationDate.toString(InvariantDateTimeFormatInfo.invariant.rfc1123Pattern));
            sb.append('"');
        }

        if (this.modificationDate != null) {
            sb.append('; modification-date="');
            sb.append(this.modificationDate.toString(InvariantDateTimeFormatInfo.invariant.rfc1123Pattern));
            sb.append('"');
        }

        if (this.readDate != null) {
            sb.append('; read-date="');
            sb.append(this.readDate.toString(InvariantDateTimeFormatInfo.invariant.rfc1123Pattern));
            sb.append('"');
        }

        return sb.toString();
    }
}


export namespace ContentDisposition {
    /**
     * A mutable builder for {@code ContentDisposition}.
     */
    export interface Builder {

        /**
         * Set the value of the {@literal name} parameter
         */
        setName(name: string): Builder;

        /**
         * Set the value of the {@literal filename*} that will be encoded as
         * defined in the RFC 5987. Only the US-ASCII, UTF-8 and ISO-8859-1
         * charsets are supported.
         * <p><strong>Note:</strong> Do not use this for a
         * {@code "multipart/form-data"} requests as per
         * <a link="https://tools.ietf.org/html/rfc7578#section-4.2">RFC 7578, Section 4.2</a>
         * and also RFC 5987 itself mentions it does not transform to multipart
         * requests.
         */
        setFileName(filename: string, encoding?: Encoding): Builder;

        /**
         * Set the value of the {@literal setSize} parameter
         */
        setSize(size: number): Builder;

        /**
         * Set the value of the {@literal creation-date} parameter.
         */
        setCreationDate(creationDate: DateTime): Builder;

        /**
         * Set the value of the {@literal modification-date} parameter.
         */
        setModificationDate(modificationDate: DateTime): Builder;

        /**
         * Set the value of the {@literal read-date} parameter.
         */
        setReadDate(readDate: DateTime): Builder;

        /**
         * Build the content disposition
         */
        build(): ContentDisposition;
    }


    export class BuilderImpl implements Builder {
        private _type: string;
        private _name: string | undefined;
        private _filename: string | undefined;
        private _charset: Encoding | undefined;
        private _size: number | undefined;
        private _creationDate: DateTime | undefined;
        private _modificationDate: DateTime | undefined;
        private _readDate: DateTime | undefined;


        public constructor(type: string) {
            Assert.hasText(type, `'type' must not be not empty`);

            this._type = type;
        }


        public setName(name: string): this {
            this._name = name;

            return this;
        }


        public setFileName(filename: string, charset?: Encoding): this {
            this._filename = filename;
            this._charset = charset;

            return this;
        }


        public setSize(size: number): this {
            this._size = size;

            return this;
        }


        public setCreationDate(creationDate: DateTime): this {
            this._creationDate = creationDate;

            return this;
        }


        public setModificationDate(modificationDate: DateTime): this {
            this._modificationDate = modificationDate;

            return this;
        }


        public setReadDate(readDate: DateTime): this {
            this._readDate = readDate;

            return this;
        }


        public build(): ContentDisposition {
            return new ContentDisposition(
                this._type, this._name, this._filename, this._charset,
                this._size, this._creationDate, this._modificationDate, this._readDate
            );
        }
    }
}
