import {Writable} from '../../../../../src/System/Stream/Writable';


export class TextWrapper extends Writable<string, string> {
    private _before: string;
    private _after: string;


    public constructor(before: string, after: string) {
        super();
        this._before = before;
        this._after = after;
    }


    public async close(): Promise<void> {

    }


    protected async _write(output: string): Promise<void> {

    }


    protected async transform(input: string): Promise<string> {
        return `${this._before}${input}${this._after}`;
    }
}
