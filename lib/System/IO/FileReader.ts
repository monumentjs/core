import * as FileSystemModule from 'fs';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import StreamReader from '../Stream/StreamReader';
import FileStream from './FileStream';
import {FileMode} from './types';


export default class FileReader
    extends StreamReader<FileStream, Buffer>
    implements IInternalStreamProvider<FileSystemModule.ReadStream> {


    public constructor(fileName: string) {
        assertArgumentNotNull('fileName', fileName);

        super(new FileStream(fileName, FileMode.Read | FileMode.NonBlock));
    }


    public getInternalStream(): FileSystemModule.ReadStream {
        return FileSystemModule.createReadStream(this.sourceStream.fileName, {
            fd: this.sourceStream.fileDescriptor
        });
    }
}
