import {Path} from '../../path/Path';
import {InputStream} from '@monument/core/main/stream/InputStream';
import {MemorySize} from '@monument/core/main/MemorySize';
import {CloseableStream} from '@monument/core/main/stream/CloseableStream';


export interface FileInputStream extends InputStream<Buffer>, CloseableStream {
    readonly path: Path;
    readonly bytesRead: MemorySize;
}
