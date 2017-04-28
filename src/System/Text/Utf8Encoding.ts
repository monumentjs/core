import {Encoding} from './Encoding';


export class Utf8Encoding extends Encoding {
    public static readonly instance: Utf8Encoding = new Utf8Encoding();

    public readonly webName: string = 'utf-8';
    public readonly encodingName: string = 'utf8';
    public readonly maxCharacterSize: number = 6;
}
