import {RuntimeException} from './RuntimeException';


export class InvalidArgumentException extends RuntimeException {
    public readonly argumentName: string;

    public constructor(argumentName: string, message: string) {
        super(`Invalid argument "${argumentName}": ${message}`);

        this.argumentName = argumentName;
    }
}
