import {Exception} from './Exception';


export class InvalidArgumentException extends Exception {
    public readonly argumentName: string;


    public constructor(argumentName: string, message: string) {
        super(`Invalid argument "${argumentName}": ${message}`);

        this.argumentName = argumentName;
    }
}
