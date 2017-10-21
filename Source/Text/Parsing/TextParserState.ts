

export class TextParserState {
    private _currentChar: string = '';
    private _previousChar: string = '';


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
}
