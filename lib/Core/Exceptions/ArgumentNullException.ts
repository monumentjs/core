import Exception from './Exception';


export default class ArgumentNullException extends Exception {
    public readonly argumentName: string;


    public constructor(argumentName: string) {
        super(`Argument "${argumentName}" has undefined value.`);
        
        this.argumentName = argumentName;
    }
}
