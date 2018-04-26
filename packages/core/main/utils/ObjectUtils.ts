import deepEqual = require('deep-equal');
import {Equatable} from '../Equatable';


export class ObjectUtils {

    public static isEquatable(obj: object): boolean {
        return obj && typeof obj === 'object' && typeof (obj as Equatable<any>).equals === 'function';
    }


    public static isIdentical<T>(a: T, b: T): boolean {
        return deepEqual(a, b);
    }
}
