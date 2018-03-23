import {Readable} from 'stream';
import {ReadableStreamAdapter} from '../Stream/ReadableStreamAdapter';


export class StandardOutputStream extends ReadableStreamAdapter<Readable, Buffer, Buffer> {
    protected async transform(input: Buffer): Promise<Buffer> {
        return input;
    }
}
