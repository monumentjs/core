import { Exception } from './Exception';
export declare class MethodNotImplementedException extends Exception {
    readonly helpInfo: string;
    constructor(methodName: string);
}
