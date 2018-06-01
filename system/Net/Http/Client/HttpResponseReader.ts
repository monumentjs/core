import {IncomingMessage} from 'http';
import {AbstractInputStream} from '../../../Stream/AbstractInputStream';


export class HttpResponseReader extends AbstractInputStream<Buffer, IncomingMessage> {
    public async readAll(): Promise<Buffer> {
        const chunks: Buffer[] = [];

        while (!this.isEnded) {
            const chunk: Buffer | undefined = await this.read();

            if (chunk != null) {
                chunks.push(chunk);
            }
        }

        return Buffer.concat(chunks);
    }


    public close(): Promise<void> {
        let promise: Promise<void> = this.awaitClose();

        this.baseStream.destroy();

        return promise;
    }
}
