import {Equatable} from '../../main/Equatable';


export class ObjectUtils {

    public static isEquatable(obj: object): boolean {
        return obj && typeof obj === 'object' && typeof (obj as Equatable<any>).equals === 'function';
    }
}
