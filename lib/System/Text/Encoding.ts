import Sequence from '../../Core/Collections/Sequence';
import {assertArgumentNotNull} from '../../Assertion/Assert';


export type EncodingName = 'utf8' | 'utf16le' | 'ascii' | 'latin1' | 'ucs2' | 'hex' | 'base64';


export default class Encoding {
    public static readonly UTF8: Encoding = new Encoding('utf8');
    public static readonly UTF16LE: Encoding = new Encoding('utf16le');
    public static readonly ASCII: Encoding = new Encoding('ascii');
    public static readonly LATIN1: Encoding = new Encoding('latin1');
    public static readonly UCS2: Encoding = new Encoding('ucs2');
    public static readonly HEX: Encoding = new Encoding('hex');
    public static readonly BASE64: Encoding = new Encoding('base64');


    public static convert(originalString: string, originalEncoding: Encoding, targetEncoding: Encoding): string {
        assertArgumentNotNull('originalString', originalString);
        assertArgumentNotNull('originalEncoding', originalEncoding);
        assertArgumentNotNull('targetEncoding', targetEncoding);

        let buffer: Buffer = originalEncoding.getBytes(originalString);

        return buffer.toString(targetEncoding.encodingName);
    }


    private _encodingName: EncodingName;


    public get encodingName(): EncodingName {
        return this._encodingName;
    }


    public constructor(encodingName: EncodingName = 'utf8') {
        this._encodingName = encodingName;
    }


    public getString(
        originalBuffer: Buffer,
        bytesOffset: number = 0,
        bytesCount: number = originalBuffer.length - bytesOffset
    ): string {
        assertArgumentNotNull('originalBuffer', originalBuffer);
        assertArgumentNotNull('bytesOffset', bytesOffset);
        assertArgumentNotNull('bytesCount', bytesCount);

        Sequence.assertSliceBounds(originalBuffer, bytesOffset, bytesCount);

        return originalBuffer.slice(bytesOffset, bytesOffset + bytesCount).toString(this.encodingName);
    }


    public getBytes(
        originalString: string,
        charsOffset: number = 0,
        charsCount: number = originalString.length - charsOffset
    ): Buffer {
        assertArgumentNotNull('originalString', originalString);
        assertArgumentNotNull('charsOffset', charsOffset);
        assertArgumentNotNull('charsCount', charsCount);

        Sequence.assertSliceBounds(originalString, charsOffset, charsCount);

        return Buffer.from(originalString, this.encodingName);
    }


    public getBytesCount(originalString: string): number {
        assertArgumentNotNull('originalString', originalString);

        return this.getBytes(originalString).length;
    }
}
