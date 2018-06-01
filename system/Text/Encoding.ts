import {IgnoreCaseComparator} from '@monument/core/main/IgnoreCaseComparator';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {List} from '@monument/collections/main/List';
import {UnknownEncodingException} from './UnknownEncodingException';


export class Encoding {
    private static _encodings: List<Encoding>;

    public static readonly BASE_64: Encoding = new Encoding('base64', 'Base64');
    public static readonly HEX: Encoding = new Encoding('hex', 'HEX');
    public static readonly ISO_8859_1: Encoding = new Encoding('ascii', 'ISO-8859-1');
    public static readonly LATIN_1: Encoding = new Encoding('latin1', 'Latin1');
    public static readonly UCS_2: Encoding = new Encoding('ucs2', 'UCS-2');
    public static readonly US_ASCII: Encoding = new Encoding('ascii', 'US-ASCII');
    public static readonly UTF_8: Encoding = new Encoding('utf8', 'UTF-8');
    public static readonly UTF_16_LE: Encoding = new Encoding('utf16le', 'UTF-16');

    private static get encodings(): List<Encoding> {
        if (this._encodings == null) {
            this._encodings = new ArrayList([
                Encoding.BASE_64,
                Encoding.HEX,
                Encoding.ISO_8859_1,
                Encoding.LATIN_1,
                Encoding.UCS_2,
                Encoding.US_ASCII,
                Encoding.UTF_8,
                Encoding.UTF_16_LE
            ]);
        }

        return this._encodings;
    }


    public static convert(originalString: string, originalEncoding: Encoding, targetEncoding: Encoding): string {
        let buffer: Buffer = originalEncoding.getBytes(originalString);

        return buffer.toString(targetEncoding._encodingName);
    }


    /**
     * Scans all known encodings and search one with specified Web name using case-insensitive comparison.
     * @throws UnknownEncodingException is encoding was not found.
     */
    public static getByWebName(webName: string): Encoding {
        const encoding = this.encodings.first((enc: Encoding): boolean => {
            return IgnoreCaseComparator.instance.equals(enc.webName, webName);
        });

        if (encoding == null) {
            throw new UnknownEncodingException(webName, `Encoding with Web name "${webName}" was not found (using case-insensitive comparison).`);
        }

        return encoding;
    }

    /**
     * Scans all known encodings and search one with specified Web name using case-insensitive comparison.
     * @throws UnknownEncodingException is encoding was not found.
     */
    public static getByName(name: string): Encoding {
        const encoding = this.encodings.first((enc: Encoding): boolean => {
            return IgnoreCaseComparator.instance.equals(enc.encodingName, name);
        });

        if (encoding == null) {
            throw new UnknownEncodingException(name, `Encoding with name "${name}" was not found (using case-insensitive comparison).`);
        }

        return encoding;
    }


    private readonly _encodingName: string;
    private readonly _webName: string;
    private readonly _maxCharacterSize: number;


    public get encodingName(): string {
        return this._encodingName;
    }


    public get webName(): string {
        return this._webName;
    }


    public get maxCharacterSize(): number {
        return this._maxCharacterSize;
    }


    protected constructor(name: string, webName: string, maxCharacterSize: number = 1) {
        this._encodingName = name;
        this._webName = webName;
        this._maxCharacterSize = maxCharacterSize;
    }


    public getStringSize(stringLength: number): number {
        return stringLength * this._maxCharacterSize;
    }


    public getString(
        originalBuffer: Buffer,
        charOffset: number = 0,
        charCount?: number
    ): string {
        let originalString: string = originalBuffer.toString(this._encodingName);

        if (charCount == null) {
            charCount = originalString.length - charOffset;
        }

        return originalString.substr(charOffset, charCount);
    }


    public getBytes(
        originalString: string,
        charOffset: number = 0,
        charCount: number = originalString.length - charOffset
    ): Buffer {
        return Buffer.from(originalString.slice(charOffset, charOffset + charCount), this._encodingName);
    }


    public getBytesCount(originalString: string): number {
        return this.getBytes(originalString).length;
    }
}
