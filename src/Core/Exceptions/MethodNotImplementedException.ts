import {Exception} from './Exception';


export class MethodNotImplementedException extends Exception {
    public readonly helpInfo: string = 'This exception throws when attempting to call method that is not implemented.';


    public constructor(methodName: string) {
        super(`Method '${methodName}' is not implemented.`);
    }
}
