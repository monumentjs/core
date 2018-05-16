

export class Message {
    private readonly _error?: Error;
    private readonly _text: string;


    public get error(): Error | undefined {
        return this._error;
    }


    public get text(): string {
        return this._text;
    }


    public constructor(text: string, error?: Error) {
        this._text = text;
        this._error = error;
    }
}
