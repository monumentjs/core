import {Path} from '../../path/Path';
import {OutputStream} from '@monument/core/main/stream/OutputStream';
import {MemorySize} from '@monument/core/main/MemorySize';
import {CloseableStream} from '@monument/core/main/stream/CloseableStream';


export interface FileOutputStream extends OutputStream<Buffer>, CloseableStream {
    readonly path: Path;
    readonly bytesWritten: MemorySize;
}
