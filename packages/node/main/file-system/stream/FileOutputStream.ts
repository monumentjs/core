import {MemorySize} from '@monument/core/main/MemorySize';
import {OutputStream} from '@monument/stream/main/OutputStream';
import {Closeable} from '@monument/stream/main/Closeable';
import {Path} from '../../path/Path';


export interface FileOutputStream extends OutputStream<Buffer>, Closeable {
    readonly path: Path;
    readonly bytesWritten: MemorySize;
}
