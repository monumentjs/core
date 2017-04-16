import {Encoding} from './Encoding';


export default class Latin1Encoding extends Encoding {
    public static readonly instance: Latin1Encoding = new Latin1Encoding();

    public readonly webName: string = 'latin1';
    public readonly encodingName: string = 'latin1';
    public readonly maxCharacterSize: number = 1;
}