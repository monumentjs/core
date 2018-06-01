import {WritableStreamAdapter} from '../Stream/WritableStreamAdapter';
import {Writable} from 'stream';


export class StandardInputStream extends WritableStreamAdapter<Writable, Buffer, Buffer> {
    protected async transform(input: Buffer): Promise<Buffer> {
        return input;
    }
}
