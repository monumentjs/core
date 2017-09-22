import {InvalidArgumentException} from './InvalidArgumentException';
import {Type} from '../Core/Types/Type';


export class ArgumentTypeException extends InvalidArgumentException {
    public readonly argumentType: Type;


    public constructor(argumentName: string, argumentType: Type) {
        super(argumentName, `Value is not instance of ${argumentType.name}.`);

        this.argumentType = argumentType;
    }
}
