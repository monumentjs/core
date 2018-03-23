import {createWriteStream, WriteStream} from 'fs';
import {AbstractOutputStream} from '../Stream/AbstractOutputStream';
import {FileOutputStream} from './FileOutputStream';


export class LocalFileOutputStream extends AbstractOutputStream<Buffer, WriteStream> implements FileOutputStream {
    private _path: string;


    public get path(): string {
        return this._path;
    }


    public get bytesWritten(): number {
        return this.baseStream.bytesWritten;
    }


    public constructor(path: string) {
        super(createWriteStream(path));

        this._path = path;
    }
}
