import {WriteStream} from 'fs';
import {Path} from '../../path/Path';
import {FileOutputStream} from '../stream/FileOutputStream';
import {LocalFileSystem} from './LocalFileSystem';


export class LocalFileOutputStream implements FileOutputStream {
    private readonly _path: Path;


    public get path(): Path {
        return this._path;
    }


    public constructor(fs: LocalFileSystem, path: Path, stream: WriteStream) {
        this._path = path;
    }


    public readonly bytesWritten: FileSize;
    public readonly closed: Event<Closeable, EventArgs>;
    public readonly isClosed: boolean;
    public readonly length: Promise<FileSize>;


    public close(): Promise<void> {
        return undefined;
    }


    public write(chunk: Buffer): Promise<void> {
        return undefined;
    }
}
