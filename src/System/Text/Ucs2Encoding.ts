import {Encoding} from './Encoding';


export class Ucs2Encoding extends Encoding {
    public static readonly instance: Ucs2Encoding = new Ucs2Encoding();

    public readonly webName: string = 'ucs-2';
    public readonly encodingName: string = 'ucs2';
    public readonly maxCharacterSize: number = 4;
}