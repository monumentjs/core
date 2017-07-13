import { Exception } from './Exception';
import { Constructor } from '../types';
export declare class ArgumentTypeException extends Exception {
    readonly argumentName: string;
    readonly argumentType: Constructor<any>;
    constructor(argumentName: string, argumentType: Constructor<any>);
}
