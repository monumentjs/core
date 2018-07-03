import {OutputStream} from '@monument/core/main/stream/OutputStream';
import {DeferredObject} from '@monument/core/main/async/DeferredObject';
import {Writable} from 'stream';


export class BinaryOutputStream implements OutputStream<Buffer> {
    protected readonly _stream: Writable;


    public constructor(stream: Writable) {
        this._stream = stream;
    }


    public write(chunk: Buffer): Promise<void> {
        const deferred: DeferredObject<void> = new DeferredObject();

        this._stream.write(chunk, (error: Error) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }
}
