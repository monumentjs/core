import {InvalidArgumentException} from './InvalidArgumentException';


export class ArgumentRangeException extends InvalidArgumentException {
    public readonly min: number;
    public readonly max: number;


    public constructor(argumentName: string, min: number, max: number) {
        super(argumentName, `Value is out of bounds: min=${min}, max=${max}.`);

        this.min = min;
        this.max = max;
    }
}
