import {ValueValidator} from './ValueValidator';


export class StringValidator extends ValueValidator<string> {
    public get minLength(): boolean {
        return this._minLength;
    }


    public get maxLength(): boolean {
        return this._maxLength;
    }


    public get pattern(): boolean {
        return this._pattern;
    }


    private _minLength: boolean = true;
    private _maxLength: boolean = true;
    private _pattern: boolean = true;


    public constructor(
        minLength: number,
        maxLength: number = Infinity,
        pattern?: RegExp
    ) {
        super();

        this.addValidator((value: string): boolean => {
            this._minLength = value.length < minLength;

            return this._minLength;
        });

        this.addValidator((value: string): boolean => {
            this._maxLength = value.length > maxLength;

            return this._maxLength;
        });

        this.addValidator((value: string): boolean => {
            this._pattern = pattern ? !pattern.test(value) : false;

            return this._pattern;
        });
    }
}
