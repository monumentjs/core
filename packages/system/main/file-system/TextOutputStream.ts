import {OutputStream} from '../../stream-core/main/OutputStream';
import {Encoding} from '../Text/Encoding';


export class TextOutputStream implements OutputStream<string> {
    private _encoding: Encoding;

    protected _destination: OutputStream<Buffer>;


    public get isClosed(): boolean {
        return this._destination.isClosed;
    }


    public get encoding(): Encoding {
        return this._encoding;
    }


    public constructor(destination: OutputStream<Buffer>, encoding: Encoding = Encoding.UTF_8) {
        this._destination = destination;
        this._encoding = encoding;
    }


    public write(chunk: string): Promise<void> {
        let bytes: Buffer = this._encoding.getBytes(chunk);

        return this._destination.write(bytes);
    }


    public flush(): Promise<void> {
        return this._destination.flush();
    }


    public close(): Promise<void> {
        return this._destination.close();
    }
}
