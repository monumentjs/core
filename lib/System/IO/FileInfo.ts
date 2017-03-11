import {AsyncResult} from '../../Core/types';
import FileSystemInfo from './FileSystemInfo';
import FileStream from './FileStream';
import {FileMode} from './types';


export default class FileInfo extends FileSystemInfo {
    public async open(fileMode?: FileMode): AsyncResult<FileStream> {
        return FileStream.open(this.fullName, fileMode);
    }

}
