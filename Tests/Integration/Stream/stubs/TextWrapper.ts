import {WriteStreamSupport} from '../../../../Source/Stream/WriteStreamSupport';


export class TextWrapper extends WriteStreamSupport<string, string> {
    private _before: string;
    private _after: string;


    public constructor(before: string, after: string) {
        super();
        this._before = before;
        this._after = after;
    }


    public async close(): Promise<void> {
        // Stub
    }


    protected async _write(output: string): Promise<void> {
        // Stub
    }


    protected async transform(input: string): Promise<string> {
        return `${this._before}${input}${this._after}`;
    }
}
