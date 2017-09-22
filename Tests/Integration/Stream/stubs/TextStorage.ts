import {WriteStreamSupport} from '../../../../Source/Stream/WriteStreamSupport';


export class TextStorage extends WriteStreamSupport<string, string> {
    private _storage: string[];


    public constructor(storage: string[]) {
        super();
        this._storage = storage;
    }


    public async close(): Promise<void> {
        // Stub
    }


    protected async _write(output: string): Promise<void> {
        this._storage.push(output);
    }


    protected async transform(input: string): Promise<string> {
        return input;
    }
}
