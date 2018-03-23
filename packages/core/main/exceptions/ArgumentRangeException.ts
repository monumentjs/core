import {InvalidArgumentException} from './InvalidArgumentException';


export class ArgumentRangeException extends InvalidArgumentException {
    public readonly min: number;
    public readonly max: number;


    public constructor(argumentName: string, argumentValue: number, min: number, max: number) {
        super(argumentName, `Value (${argumentValue}) is out of bounds: min=${min}, max=${max}.`);

        this.min = min;
        this.max = max;
    }
}
