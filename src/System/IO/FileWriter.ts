import {createWriteStream, WriteStream} from 'fs';
import {Assert} from '../../Core/Assertion/Assert';
import {WriteStreamAdapter} from './Adapters/WriteStreamAdapter';


export class FileWriter extends WriteStreamAdapter<WriteStream, Buffer, Buffer> {

    public get fileName(): string {
        return this.baseStream.path.toString();
    }


    public get bytesWritten(): number {
        return this.baseStream.bytesWritten;
    }


    public constructor(fileName: string) {
        Assert.argument('fileName', fileName).notNull();

        super(createWriteStream(fileName));
    }


    public async close(): Promise<void> {
        this.baseStream.close();
    }


    protected async transform(chunk: Buffer): Promise<Buffer> {
        return chunk;
    }
}
