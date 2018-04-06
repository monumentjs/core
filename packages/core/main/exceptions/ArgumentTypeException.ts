import {InvalidArgumentException} from './InvalidArgumentException';
import {Type} from '../Type';


export class ArgumentTypeException extends InvalidArgumentException {
    public readonly argumentType: Type<any>;


    public constructor(argumentName: string, argumentType: Type<any>) {
        super(argumentName, `Value is not instance of ${argumentType.name}.`);

        this.argumentType = argumentType;
    }
}
