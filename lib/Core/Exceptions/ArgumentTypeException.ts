import Exception from './Exception';
import {Constructor} from '../types';


export default class ArgumentTypeException extends Exception {
    public readonly argumentName: string;
    public readonly argumentType: Constructor;


    public constructor(argumentName: string, argumentType: Constructor) {
        super(`Argument "${argumentName}" is not instance of ${argumentType.name}.`);

        this.argumentName = argumentName;
        this.argumentType = argumentType;
    }
}