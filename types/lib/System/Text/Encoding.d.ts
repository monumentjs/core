export declare type EncodingName = 'utf8' | 'utf16le' | 'ascii' | 'latin1' | 'ucs2' | 'hex' | 'base64' | 'binary';
export default class Encoding {
    static UTF8: Encoding;
    static UTF16LE: Encoding;
    static ASCII: Encoding;
    static LATIN1: Encoding;
    static UCS2: Encoding;
    static HEX: Encoding;
    static BASE64: Encoding;
    static BINARY: Encoding;
    private _encodingName;
    readonly encodingName: EncodingName;
    constructor(encodingName?: EncodingName);
}
