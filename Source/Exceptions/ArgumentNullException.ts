import {InvalidArgumentException} from './InvalidArgumentException';


export class ArgumentNullException extends InvalidArgumentException {


    public constructor(argumentName: string) {
        super(argumentName, 'Value is either null or undefined.');
    }
}
