import Stream from '../Stream/Stream';
import BitMask from '../../Core/Binary/BitMask';
import {AsyncResult} from '../../Core/types';
import FileSystem from './FileSystem';
import {AccessPermissions, DataSizeUnits, FileMode} from './types';



export default class FileStream extends Stream<Buffer> {
    public static async open(
        fullName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<FileStream> {
        let fileStream: FileStream = new FileStream(fullName, fileMode, accessPermissions);

        await fileStream.open();

        return fileStream;
    }


    protected _fullName: string;
    protected _fileDescriptor: number;
    protected _fileMode: FileMode;
    protected _fileModeFlags: BitMask;
    protected _accessPermissions: AccessPermissions;
    protected _bufferSize: number = 64 * DataSizeUnits.Kilobytes;


    public constructor(
        fullName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ) {
        super();
        this._fullName = fullName;
        this._fileMode = fileMode;
        this._fileModeFlags = new BitMask(fileMode);
        this._accessPermissions = accessPermissions;
        this._canRead = this._fileModeFlags.hasFlag(FileMode.Read);
        this._canWrite = this._fileModeFlags.hasFlag(FileMode.Write);
    }


    protected async onOpen(): AsyncResult<void> {
        this._fileDescriptor = await FileSystem.open(this._fullName, this._fileMode, this._accessPermissions);
    }


    protected async onClose(): AsyncResult<void> {
        await FileSystem.close(this._fileDescriptor);

        delete this._fileDescriptor;
    }


    protected async onRead(length: number = this._bufferSize): AsyncResult<Buffer> {
        let buffer: Buffer;

        buffer = await FileSystem.read(this._fileDescriptor, this.position, length);

        await this.seek(this.position + buffer.length);

        return buffer;
    }


    protected async onWrite(buffer: Buffer): AsyncResult<void> {
        let bytesWritten: number;

        bytesWritten = await FileSystem.write(this._fileDescriptor, this.position, buffer);

        await this.seek(this.position + bytesWritten);
    }


    protected async onFlush(): AsyncResult<void> {
        await FileSystem.flush(this._fileDescriptor);
    }
}
