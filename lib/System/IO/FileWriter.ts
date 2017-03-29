import * as FileSystemModule from 'fs';
import {assertArgumentNotNull} from '../../Assertion/Assert';
import {IInternalStreamProvider} from '../Stream/IInternalStreamProvider';
import FileStream from './FileStream';
import {FileMode} from './types';
import StreamWriter from '../Stream/StreamWriter';


export default class FileWriter
    extends StreamWriter<FileStream, Buffer>
    implements IInternalStreamProvider<FileSystemModule.ReadStream> {


    public constructor(fileName: string) {
        assertArgumentNotNull('fileName', fileName);

        super(new FileStream(fileName, FileMode.Write | FileMode.NonBlock | FileMode.Create));
    }


    public getInternalStream(): FileSystemModule.ReadStream {
        let sourceStream: FileStream = this._sourceStream as FileStream;

        return FileSystemModule.createReadStream(sourceStream.fileName, {
            fd: sourceStream.fileDescriptor
        });
    }
}
