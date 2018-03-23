import {Readable} from 'stream';
import {Delegate} from '../../core/Events/Decorators/Delegate';
import {DeferredObject} from '../../async/main/DeferredObject';
import {InputStream} from '../../stream-core/main/InputStream';
import {ClosedStreamException} from '../../stream-core/main/ClosedStreamException';
import {EndOfStreamException} from '../../stream-core/main/EndOfStreamException';
import {CloseableStream} from './CloseableStream';
import {OutputStream} from '../../stream-core/main/OutputStream';


export abstract class AbstractInputStream<T, TBase extends Readable & CloseableStream> implements InputStream<T> {
    private _isEnded: boolean = false;
    private _isClosed: boolean = false;

    protected _baseStream: TBase;


    public get isEnded(): boolean {
        return this._isEnded;
    }


    public get isClosed(): boolean {
        return this._isClosed;
    }


    public constructor(baseStream: TBase) {
        this._baseStream = baseStream;
        this._baseStream.on('close', this.onBaseStreamClosed);
        this._baseStream.on('end', this.onBaseStreamEnded);
    }


    public async read(): Promise<T | undefined> {
        if (this.isClosed) {
            throw new ClosedStreamException('Cannot read from closed stream.');
        }

        if (this.isEnded) {
            throw new EndOfStreamException('Cannot read from ended stream.');
        }

        let chunk: T | null = this._baseStream.read();

        if (chunk == null && !this.isClosed) {
            await this.fillInternalBuffer();

            chunk = this._baseStream.read();
        }

        if (chunk == null) {
            this._isEnded = true;

            return undefined;
        }

        return chunk;
    }


    public async copyTo(output: OutputStream<T>): Promise<void> {
        while (!this.isEnded && !this.isClosed) {
            let chunk: T | undefined = await this.read();

            if (chunk != null) {
                await output.write(chunk);
            }
        }
    }


    public close(): Promise<void> {
        let deferred: DeferredObject<void> = new DeferredObject();

        if (this.isClosed) {
            deferred.resolve();
        } else if (this._baseStream.close) {
            let onClose = () => {
                this._baseStream.removeListener('error', onError);

                deferred.resolve();
            };

            let onError = (error: Error) => {
                this._baseStream.removeListener('close', onClose);

                deferred.reject(error);
            };

            this._baseStream.once('close', onClose);
            this._baseStream.once('error', onError);

            this._baseStream.close();
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }


    @Delegate()
    protected onBaseStreamClosed(): void {
        this._isClosed = true;
    }


    @Delegate()
    protected onBaseStreamEnded(): void {
        this._isEnded = true;
    }


    protected fillInternalBuffer(): Promise<void> {
        let deferred: DeferredObject<void> = new DeferredObject();

        let onReadable = () => {
            removeListeners();

            deferred.resolve();
        };

        let onClose = () => {
            removeListeners();

            deferred.resolve();
        };

        let onError = (error: Error) => {
            removeListeners();

            deferred.reject(error);
        };

        let removeListeners = () => {
            this._baseStream.removeListener('close', onClose);
            this._baseStream.removeListener('readable', onReadable);
            this._baseStream.removeListener('error', onError);
        };

        this._baseStream.once('close', onClose);
        this._baseStream.once('readable', onReadable);
        this._baseStream.once('error', onError);

        return deferred.promise;
    }
}
