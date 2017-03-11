import Sequence from '../../Core/Collections/Sequence';


export type EncodingName = 'utf8' | 'utf16le' | 'ascii' | 'latin1' | 'ucs2' | 'hex' | 'base64' | 'binary';


export default class Encoding {
    public static UTF8: Encoding = new Encoding('utf8');
    public static UTF16LE: Encoding = new Encoding('utf16le');
    public static ASCII: Encoding = new Encoding('ascii');
    public static LATIN1: Encoding = new Encoding('latin1');
    public static UCS2: Encoding = new Encoding('ucs2');
    public static HEX: Encoding = new Encoding('hex');
    public static BASE64: Encoding = new Encoding('base64');
    public static BINARY: Encoding = new Encoding('binary');


    public static convert(originalString: string, originalEncoding: Encoding, targetEncoding: Encoding): string {
        return originalEncoding.getBytes(originalString).toString(targetEncoding.encodingName);
    }


    private _encodingName: EncodingName;


    get encodingName(): EncodingName {
        return this._encodingName;
    }


    constructor(encodingName: EncodingName = 'utf8') {
        this._encodingName = encodingName;
    }


    public getString(
        originalBuffer: Buffer,
        bytesOffset: number = 0,
        bytesCount: number = originalBuffer.length - bytesOffset
    ): string {
        Sequence.assertBounds(originalBuffer, bytesOffset, bytesCount);

        return originalBuffer.slice(bytesOffset, bytesOffset + bytesCount).toString(this.encodingName);
    }


    public getBytes(
        originalString: string,
        charsOffset: number = 0,
        charsCount: number = originalString.length - charsOffset
    ): Buffer {
        Sequence.assertBounds(originalString, charsOffset, charsCount);

        return Buffer.from(originalString, this.encodingName);
    }


    public getBytesCount(originalString: string): number {
        return this.getBytes(originalString).length;
    }
}
