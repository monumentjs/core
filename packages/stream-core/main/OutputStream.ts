import {Closeable} from './Closeable';


export interface OutputStream<T> extends Closeable {
    write(chunk: T): Promise<void>;
    flush(): Promise<void>;
}
