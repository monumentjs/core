import {Exception} from './Exception';


export class InvalidArgumentException extends Exception {
    private readonly _argumentName: string;


    public get argumentName(): string {
        return this._argumentName;
    }


    public constructor(argumentName: string, message: string) {
        super(`Invalid argument "${argumentName}": ${message}`);

        this._argumentName = argumentName;
    }
}
