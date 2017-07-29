import {ValueValidator} from './ValueValidator';


export class NumberValidator extends ValueValidator<number> {
    public get min(): boolean {
        return this._min;
    }


    public get max(): boolean {
        return this._max;
    }


    private _min: boolean = true;
    private _max: boolean = true;


    public constructor(min: number, max: number = Infinity) {
        super();

        this.addValidator((value: number): boolean => {
            this._min = value < min;

            return this._min;
        });

        this.addValidator((value: number): boolean => {
            this._max = value > max;

            return this._max;
        });
    }
}
