import {Encoding} from './Encoding';


export default class HexEncoding extends Encoding {
    public static readonly instance: HexEncoding = new HexEncoding();

    public readonly webName: string = 'hex';
    public readonly encodingName: string = 'hex';
    public readonly maxCharacterSize: number = 1;
}