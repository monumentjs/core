import {Encoding} from './Encoding';


export default class Utf16LeEncoding extends Encoding {
    public static readonly instance: Utf16LeEncoding = new Utf16LeEncoding();

    public readonly webName: string = 'utf-16';
    public readonly encodingName: string = 'utf16le';
    public readonly maxCharacterSize: number = 2;
}