import { Exception } from './Exception';
export declare class ArgumentNullException extends Exception {
    readonly argumentName: string;
    constructor(argumentName: string);
}
