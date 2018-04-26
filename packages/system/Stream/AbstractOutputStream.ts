import {Writable} from 'stream';
import {Exception} from '@monument/core/main/exceptions/Exception';
import {DeferredObject} from '@monument/async/main/DeferredObject';
import {ConfigurableEvent} from '../../events/main/ConfigurableEvent';
import {ErrorEventArgs} from '@monument/events/main/ErrorEventArgs';
import {OutputStream} from '@monument/stream-core/main/OutputStream';
import {ClosedStreamException} from '@monument/stream-core/main/ClosedStreamException';
import {EndOfStreamException} from '@monument/stream-core/main/EndOfStreamException';
import {CloseableStream} from './CloseableStream';


export abstract class AbstractOutputStream<T, TBase extends Writable & CloseableStream> extends ConfigurableEvent implements OutputStream<T> {
    private _isClosed: boolean = false;
    private _isFinished: boolean = false;
    private _failed: ConfigurableEvent<this, ErrorEventArgs> = this.createEventDispatcher();

    protected baseStream: TBase;


    public get isClosed(): boolean {
        return this._isClosed;
    }


    public get isFinished(): boolean {
        return this._isFinished;
    }


    public get failed(): EventSource<this, ErrorEventArgs> {
        return this._failed;
    }


    public constructor(baseStream: TBase) {
        super();

        this.baseStream = baseStream;
        this.baseStream.on('close', this.onBaseStreamClosed);
        this.baseStream.on('finish', this.onBaseStreamFinished);
        this.baseStream.on('error', this.onBaseStreamFailed);
    }


    public write(chunk: T): Promise<void> {
        if (this.isClosed) {
            throw new ClosedStreamException('Cannot write to closed stream.');
        }

        if (this.isFinished) {
            throw new EndOfStreamException('Cannot write to ended stream.');
        }

        let deferred: DeferredObject<void> = new DeferredObject();

        this.baseStream.write(chunk, (error: Error) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        return deferred.promise;
    }


    public flush(): Promise<void> {
        return Promise.resolve();
    }


    public async close(): Promise<void> {
        let deferred: DeferredObject<void> = new DeferredObject();

        this.baseStream.end((error: Error) => {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve();
            }
        });

        await deferred.promise;

        if (this.baseStream.close) {
            this.baseStream.close();
        }
    }


    @Delegate
    protected onBaseStreamClosed(): void {
        this._isClosed = true;
    }


    @Delegate
    protected onBaseStreamFinished(): void {
        this._isFinished = true;
    }


    @Delegate
    protected onBaseStreamFailed(error: Error): void {
        this._failed.dispatch(new ErrorEventArgs(Exception.cast(error)));
    }
}
