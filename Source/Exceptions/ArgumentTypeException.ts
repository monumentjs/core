import {Exception} from './Exception';
import {Constructor} from '../types';


export class ArgumentTypeException extends Exception {
    public readonly argumentName: string;
    public readonly argumentType: Constructor<any>;


    public constructor(argumentName: string, argumentType: Constructor<any>) {
        super(`Invalid argument "${argumentName}": value is not instance of ${argumentType.name}.`);

        this.argumentName = argumentName;
        this.argumentType = argumentType;
    }
}