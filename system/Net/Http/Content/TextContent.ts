import {OutputStream} from '../../../../stream/main/OutputStream';
import {HttpContent} from './HttpContent';
import {Encoding} from '../../../Text/Encoding';
import {MediaType} from '../Mime/MediaType';


export class TextContent extends HttpContent {
    public readonly text: string;
    public readonly encoding: Encoding;
    public readonly bytes: Buffer;


    public constructor(text: string, encoding: Encoding = Encoding.UTF_8) {
        super();

        this.text = text;
        this.encoding = encoding;
        this.bytes = encoding.getBytes(text);

        this.headers.contentType = MediaType.parseMediaType('text/plain');
        this.headers.contentLength = this.bytes.length;
    }


    public async refresh(): Promise<void> {
        // Content-Type and Content-Length headers are already calculated,
        // so this method do nothing,
        // but it may be overridden in subclasses to re-evaluate values of
        // necessary fields.
    }


    public copyTo(writer: OutputStream<Buffer>): Promise<void> {
        return writer.write(this.bytes);
    }
}
