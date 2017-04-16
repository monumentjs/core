import {createReadStream, ReadStream} from 'fs';
import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import {StreamReader} from '../Stream/StreamReader';
import FileStream from './FileStream';
import {AsyncResult} from '../../Core/types';


export default class FileReader
    extends StreamReader<FileStream, Buffer>
    implements IInternalStreamProvider<ReadStream> {


    public get isFlowing(): boolean {
        let sourceStream = this.sourceStream;

        return !this.isPaused && !sourceStream.isDisposing && !sourceStream.isDisposed && !sourceStream.isClosed;
    }


    public get position(): number {
        return this.sourceStream.position;
    }


    public get length(): number {
        return this.sourceStream.length;
    }


    public getInternalStream(): ReadStream {
        return createReadStream(this.sourceStream.fileName, {
            fd: this.sourceStream.fileDescriptor
        });
    }


    protected async onRead(size: number): AsyncResult<Buffer> {
        if (this.sourceStream.isReady) {
            await this.sourceStream.open();
        }

        return this.sourceStream.read(size);
    }


    protected async onClose(): AsyncResult<void> {
        if (!this.sourceStream.isClosed) {
            await this.sourceStream.close();
        }
    }


    protected async onPause(): AsyncResult<void> {
        // Stub
    }


    protected async onResume(): AsyncResult<void> {
        // Stub
    }
}
