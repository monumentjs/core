import {Stream} from '../Stream/Stream';
import {BitMask} from '../../Core/Binary/BitMask';
import {AsyncResult} from '../../Core/types';
import {assertArgumentBounds, assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {FILE_STREAM_BUFFER_SIZE} from './constants';
import {FileMode} from './FileMode';
import {AccessPermissions} from './AccessPermissions';
import {FileStorage} from './FileStorage';


export class FileStream extends Stream<Buffer> {
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

    private _bufferSize: number = FILE_STREAM_BUFFER_SIZE;


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


    public set bufferSize(value: number) {
        assertArgumentNotNull('value', value);
        assertArgumentBounds('value', value, 1, Infinity);

        this._bufferSize = value;
    }


    public get canRead(): boolean {
        let isReadOnlyMode: boolean = this._fileModeFlags.get(0) === false;
        let isReadWriteMode: boolean = this._fileModeFlags.hasFlag(FileMode.ReadWrite);

        return isReadOnlyMode || isReadWriteMode;
    }


    public get canWrite(): boolean {
        let isWriteOnlyMode: boolean = this._fileModeFlags.hasFlag(FileMode.Write);
        let isReadWriteMode: boolean = this._fileModeFlags.hasFlag(FileMode.ReadWrite);

        return isWriteOnlyMode || isReadWriteMode;
    }


    protected constructor(
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
    }


    protected async onOpen(): AsyncResult {
        this._fileDescriptor = await FileStorage.open(this.fileName, this.fileMode, this.accessPermissions);
    }


    protected async onClose(): AsyncResult {
        await FileStorage.close(this.fileDescriptor);

        delete this._fileDescriptor;
    }


    protected async onRead(length: number = this.bufferSize): AsyncResult<Buffer> {
        let buffer: Buffer = await FileStorage.read(this.fileDescriptor, this.position, length);

        this._position += buffer.length;

        return buffer;
    }


    protected async onWrite(chunk: Buffer): AsyncResult<number> {
        return FileStorage.write(this.fileDescriptor, this.position, chunk);
    }


    protected async onSeek(position: number): AsyncResult<number> {
        return position;
    }


    protected async onFlush(): AsyncResult {
        await FileStorage.flush(this.fileDescriptor);
    }


    protected async onDispose(): AsyncResult {
        // Stub
    }
}
