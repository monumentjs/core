import {InvalidArgumentException} from './InvalidArgumentException';


export class ArgumentIndexOutOfBoundsException extends InvalidArgumentException {

    public constructor(argumentName: string, index: number, min: number, max: number) {
        super(argumentName, `Index (${index}) is out of bounds: min=${min}, max=${max}.`);
    }
}
