import {assertArgumentNotNull, assertArgumentType} from '../../Core/Assertion/Assert';
import {StreamWriter} from '../Stream/StreamWriter';
import {AsyncResult} from '../../Core/types';
import {Stream} from '../Stream/Stream';
import {Encoding} from '../Text/Encoding';
import {Utf8Encoding} from '../Text/Utf8Encoding';


export class TextWriter
    extends StreamWriter<Stream<Buffer>, string> {

    private _encoding: Encoding = Utf8Encoding.instance;


    public get encoding(): Encoding {
        return this._encoding;
    }


    public set encoding(value: Encoding) {
        assertArgumentNotNull('value', value);
        assertArgumentType('value', value, Encoding);

        this._encoding = value;
    }


    protected onWrite(chunk: string): AsyncResult<number> {
        let bytes: Buffer = this.encoding.getBytes(chunk);

        return this.targetStream.write(bytes);
    }
}
