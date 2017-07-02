import {createReadStream, ReadStream} from 'fs';
import {Assert} from '../../Core/Assertion/Assert';
import {ReadStreamAdapter} from './Adapters/ReadStreamAdapter';


export class FileReader extends ReadStreamAdapter<ReadStream, Buffer, Buffer> {
    public get fileName(): string {
        return this.baseStream.path.toString();
    }


    public get bytesRead(): number {
        return this.baseStream.bytesRead;
    }


    public constructor(fileName: string) {
        Assert.argument('fileName', fileName).notNull();

        super(createReadStream(fileName));
    }


    public close(): void {
        this.baseStream.close();
    }


    protected async transform(chunk: Buffer): Promise<Buffer> {
        return chunk;
    }
}
