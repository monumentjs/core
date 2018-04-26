import {InputStream} from '../../stream-core/main/InputStream';


export interface FileInputStream extends InputStream<Buffer> {
    readonly path: string;
    readonly bytesRead: number;
    readonly length: Promise<number>;
}
