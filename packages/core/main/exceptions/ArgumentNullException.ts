import {InvalidArgumentException} from './InvalidArgumentException';


export class ArgumentNullException extends InvalidArgumentException {


    public constructor(argumentName: string) {
        super(argumentName, 'Argument value is either null or undefined.');
    }
}
