import {ReadStreamSupport} from '../../../../Source/Stream/ReadStreamSupport';


export class NumbersReader extends ReadStreamSupport<number, number> {
    private _source: number[];


    public constructor(source: number[]) {
        super();

        this._source = source;
    }


    protected async _read(): Promise<number | undefined> {
        return this._source.shift();
    }


    protected async transform(chunk: number): Promise<number> {
        return chunk;
    }
}
