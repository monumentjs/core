import {OutputStream} from '../../stream-core/main/OutputStream';


export interface FileOutputStream extends OutputStream<Buffer> {
    readonly path: string;
    readonly bytesWritten: number;
    readonly length: Promise<number>;
}
