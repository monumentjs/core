import {StringPool} from '../../StringPool';


export class TextParserContext<TResult> {
    private _result: TResult | undefined;
    private _input: string = StringPool.BLANK;
    private _index: number = 0;
    private _inputPosition: number = 0;


    public get result(): TResult | undefined {
        return this._result;
    }


    public set result(value: TResult | undefined) {
        this._result = value;
    }


    public get input(): string {
        return this._input;
    }


    public set input(input: string) {
        this._input = input;
        this._inputPosition = 0;
    }


    public get currentChar(): string {
        return this._input[this._inputPosition] || StringPool.BLANK;
    }


    public get index(): number {
        return this._index;
    }


    public next(): boolean {
        if (this._inputPosition < this._input.length) {
            this._inputPosition += 1;
            this._index += 1;

            return true;
        }

        return false;
    }
}
