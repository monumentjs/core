import {NodeStringDecoder, StringDecoder} from 'string_decoder';
import {InputStream} from '../../stream-core/main/InputStream';
import {Encoding} from '../Text/Encoding';


export class TextInputStream implements InputStream<string> {
    private _encoding: Encoding;
    private _decoder: NodeStringDecoder;

    protected _source: InputStream<Buffer>;


    public get isClosed(): boolean {
        return this._source.isClosed;
    }


    public get isEnded(): boolean {
        return this._source.isEnded;
    }


    public get encoding(): Encoding {
        return this._encoding;
    }


    public constructor(source: InputStream<Buffer>, encoding: Encoding = Encoding.UTF_8) {
        this._source = source;
        this._encoding = encoding;
        this._decoder = new StringDecoder(encoding.encodingName);
    }


    public async read(): Promise<string | undefined> {
        let bytes: Buffer | undefined = await this._source.read();

        if (bytes == null) {
            return undefined;
        }

        return this._decoder.write(bytes);
    }


    public close(): Promise<void> {
        return this._source.close();
    }
}
