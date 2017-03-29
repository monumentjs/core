import {Stream} from '../Stream/Stream';
import BitMask from '../../Core/Binary/BitMask';
import {AsyncResult} from '../../Core/types';
import FileSystem from './FileSystem';
import {AccessPermissions, FileMode} from './types';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import {DEFAULT_STREAM_CHUNK_SIZE} from './constants';


export default class FileStream extends Stream<string|Buffer> {
    public static async open(
        fileName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ): AsyncResult<FileStream> {
        let fileStream: FileStream = new FileStream(fileName, fileMode, accessPermissions);

        await fileStream.open();

        return fileStream;
    }


    protected _fileName: string;
    protected _fileDescriptor: number;
    protected _fileMode: FileMode;
    protected _fileModeFlags: BitMask;
    protected _accessPermissions: AccessPermissions;
    protected _bufferSize: number = DEFAULT_STREAM_CHUNK_SIZE;


    public get fileName(): string {
        return this._fileName;
    }


    public get fileDescriptor(): number {
        return this._fileDescriptor;
    }


    public get fileMode(): FileMode {
        return this._fileMode;
    }


    public get accessPermissions(): AccessPermissions {
        return this._accessPermissions;
    }


    public get bufferSize(): number {
        return this._bufferSize;
    }


    public constructor(
        fileName: string,
        fileMode: FileMode = FileMode.ReadWrite | FileMode.NonBlock,
        accessPermissions: AccessPermissions = AccessPermissions.Default
    ) {
        super();

        assertArgumentNotNull('fileName', fileName);
        assertArgumentNotNull('fileMode', fileMode);
        assertArgumentNotNull('accessPermissions', accessPermissions);

        this._fileName = fileName;
        this._fileMode = fileMode;
        this._fileModeFlags = new BitMask(fileMode);
        this._accessPermissions = accessPermissions;
        this._canRead = this._fileModeFlags.hasFlag(FileMode.Read);
        this._canWrite = this._fileModeFlags.hasFlag(FileMode.Write);
    }


    protected async onOpen(): AsyncResult<void> {
        this._fileDescriptor = await FileSystem.open(this._fileName, this._fileMode, this._accessPermissions);
    }


    protected async onClose(): AsyncResult<void> {
        await FileSystem.close(this.fileDescriptor);

        delete this._fileDescriptor;
    }


    protected async onRead(length: number = this._bufferSize): AsyncResult<Buffer> {
        let buffer: Buffer = await FileSystem.read(this.fileDescriptor, this.position, length);

        await this.seek(this.position + buffer.length);

        return buffer;
    }


    protected async onWrite(chunk: Buffer): AsyncResult<number> {
        let buffer: Buffer = chunk as Buffer;
        return FileSystem.write(this.fileDescriptor, this.position, buffer);
    }


    protected async onSeek(position: number): AsyncResult<number> {
        return position;
    }


    protected async onFlush(): AsyncResult<void> {
        await FileSystem.flush(this.fileDescriptor);
    }


    protected async onPause(): AsyncResult<void> {
        // Placeholder
    }

    protected async onResume(): AsyncResult<void> {
        // Placeholder
    }

    protected async onDispose(): AsyncResult<void> {
        // Placeholder
    }
}
