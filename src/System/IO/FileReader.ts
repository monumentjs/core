import {createReadStream, ReadStream} from 'fs';
import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import {StreamReader} from '../Stream/StreamReader';
import {FileStream} from './FileStream';


export class FileReader
    extends StreamReader<FileStream, Buffer>
    implements IInternalStreamProvider<ReadStream> {

    private _internalStream: ReadStream;


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
        if (this._internalStream == null) {
            this._internalStream = createReadStream(this.sourceStream.fileName, {
                fd: this.sourceStream.fileDescriptor
            });
        }

        return this._internalStream;
    }


    protected async onRead(size: number): Promise<Buffer> {
        if (this.sourceStream.isReady) {
            await this.sourceStream.open();
        }

        return this.sourceStream.read(size);
    }


    protected async onClose(): Promise<void> {
        if (!this.sourceStream.isClosed) {
            await this.sourceStream.close();
        }
    }


    protected async onPause(): Promise<void> {
        // Stub
    }


    protected async onResume(): Promise<void> {
        // Stub
    }
}
