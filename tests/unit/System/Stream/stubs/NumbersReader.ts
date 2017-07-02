import {Readable} from '../../../../../src/System/Stream/Readable';


export class NumbersReader extends Readable<number, number> {
    private _source: number[];


    public constructor(source: number[]) {
        super();
        this._source = source;
    }


    protected async _read(): Promise<number> {
        return this._source.shift();
    }


    protected async transform(chunk: number): Promise<number> {
        return chunk;
    }
    
}
