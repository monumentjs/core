import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import FileStream from './FileStream';
import {StreamWriter} from '../Stream/StreamWriter';
import {AsyncResult} from '../../Core/types';
import {createReadStream, ReadStream} from 'fs';


export default class FileWriter
    extends StreamWriter<FileStream, Buffer>
    implements IInternalStreamProvider<ReadStream> {


    public get position(): number {
        return this.targetStream.position;
    }


    public get length(): number {
        return this.targetStream.length;
    }


    public getInternalStream(): ReadStream {
        return createReadStream(this.targetStream.fileName, {
            fd: this.targetStream.fileDescriptor
        });
    }


    protected async onWrite(chunk: Buffer): AsyncResult<number> {
        if (this.targetStream.isReady) {
            await this.targetStream.open();
        }

        return this.targetStream.write(chunk);
    }
}
