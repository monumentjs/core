import {Encoding} from './Encoding';


export class AsciiEncoding extends Encoding {
    public static readonly instance: AsciiEncoding = new AsciiEncoding();

    public readonly webName: string = 'us-ascii';
    public readonly encodingName: string = 'ascii';
    public readonly maxCharacterSize: number = 1;
}