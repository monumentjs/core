import * as FileSystemModule from 'fs';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import StreamReader from '../Stream/StreamReader';
import FileStream from './FileStream';
import {FileMode} from './types';


export default class TextReader
    extends StreamReader<FileStream, string>
    implements IInternalStreamProvider<FileSystemModule.ReadStream> {


    public constructor(fileName: string) {
        assertArgumentNotNull('fileName', fileName);

        super(new FileStream(fileName, FileMode.Read | FileMode.NonBlock));
    }


    public getInternalStream(): FileSystemModule.ReadStream {
        let sourceStream: FileStream = this._sourceStream as FileStream;

        return FileSystemModule.createReadStream(sourceStream.fileName, {
            fd: sourceStream.fileDescriptor
        });
    }
}
