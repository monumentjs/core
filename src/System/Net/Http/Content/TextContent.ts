import {HttpContent} from '../HttpContent';
import {Encoding} from '../../../Text/Encoding';
import {Utf8Encoding} from '../../../Text/Utf8Encoding';
import {Assert} from '../../../../Core/Assertion/Assert';
import {Writable} from '../../../Stream/Writable';


export class TextContent extends HttpContent {
    private _encoding: Encoding;
    private _bytes: Buffer;


    public constructor(content: string, encoding: Encoding = Utf8Encoding.instance) {
        Assert.argument('content', content).notNull();
        Assert.argument('encoding', encoding).notNull();

        super();

        this._encoding = encoding;
        this._bytes = encoding.getBytes(content);

        this.headers.set('Content-Type', 'text/plain');
        this.headers.set('Content-Length', this._bytes.length.toString(10));
    }


    public copyTo(writer: Writable<Buffer, any>): Promise<void> {
        return writer.write(this._bytes);
    }
}
