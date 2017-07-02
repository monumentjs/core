import {Exception} from './Exception';


export class ArgumentNullException extends Exception {
    public readonly argumentName: string;


    public constructor(argumentName: string) {
        super(`Invalid argument "${argumentName}": value is either null or undefined.`);
        
        this.argumentName = argumentName;
    }
}
