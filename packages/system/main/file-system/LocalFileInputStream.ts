import {createReadStream, ReadStream} from 'fs';
import {AbstractInputStream} from '../Stream/AbstractInputStream';
import {FileInputStream} from './FileInputStream';


export class LocalFileInputStream extends AbstractInputStream<Buffer, ReadStream> implements FileInputStream {
    private _path: string;


    public get path(): string {
        return this._path;
    }


    public get bytesRead(): number {
        return this._baseStream.bytesRead;
    }


    public constructor(path: string) {
        super(createReadStream(path));

        this._path = path;
    }
}
