

export class TextParserState {
    private _sourceString: string;
    private _currentChar: string = '';
    private _previousChar: string = '';


    public get sourceString(): string {
        return this._sourceString;
    }


    public get currentChar(): string {
        return this._currentChar;
    }


    public set currentChar(value: string) {
        this._previousChar = this._currentChar;
        this._currentChar = value;
    }


    public get previousChar(): string {
        return this._previousChar;
    }


    public index: number = 0;


    public constructor(sourceString: string) {
        this._sourceString = sourceString;
    }
}
