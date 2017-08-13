import {Constructor} from '../types';
import {InvalidArgumentException} from './InvalidArgumentException';


export class ArgumentTypeException extends InvalidArgumentException {
    public readonly argumentType: Constructor<any>;


    public constructor(argumentName: string, argumentType: Constructor<any>) {
        super(argumentName, `Value is not instance of ${argumentType.name}.`);

        this.argumentType = argumentType;
    }
}
