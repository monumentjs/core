import {Encoding} from './Encoding';


export default class Base64Encoding extends Encoding {
    public static readonly instance: Base64Encoding = new Base64Encoding();

    public readonly webName: string = 'base64';
    public readonly encodingName: string = 'base64';
    public readonly maxCharacterSize: number = 1;
}