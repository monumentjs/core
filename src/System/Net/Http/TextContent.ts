import {HttpContent} from './HttpContent';
import {AsyncResult} from '../../../Core/types';
import {Encoding} from '../../Text/Encoding';
import {StreamWriter} from '../../Stream/StreamWriter';
import Utf8Encoding from '../../Text/Utf8Encoding';


export default class TextContent extends HttpContent {
    private _content: string;
    private _encoding: Encoding;
    private _bytes: Buffer;


    public constructor(content: string, encoding: Encoding = Utf8Encoding.instance) {
        super();

        this._content = content;
        this._encoding = encoding;
        this._bytes = encoding.getBytes(content);

        this.headers.set('Content-Type', 'text/plain');
        this.headers.set('Content-Length', this._bytes.length.toString(10));
    }


    public async copyTo(writer: StreamWriter<any, Buffer>): AsyncResult<void> {
        await writer.write(this._bytes);
    }
}
