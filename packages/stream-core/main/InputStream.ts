import {Closeable} from './Closeable';
import {OutputStream} from './OutputStream';


export interface InputStream<T> extends Closeable {
    isEnded: boolean;
    read(): Promise<T | undefined>;
    copyTo(output: OutputStream<T>): Promise<void>;
}
