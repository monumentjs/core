import {Stream} from 'stream';


export interface CloseableStream extends Stream {
    close?(): void;
}
