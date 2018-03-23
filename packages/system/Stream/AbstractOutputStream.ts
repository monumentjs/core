import {Writable} from 'stream';
import {Delegate} from '@monument/core/Events/Decorators/Delegate';
import {DeferredObject} from '../../async/main/DeferredObject';
import {OutputStream} from '../../stream-core/main/OutputStream';
import {ClosedStreamException} from '../../stream-core/main/ClosedStreamException';
import {EndOfStreamException} from '../../stream-core/main/EndOfStreamException';
import {AbstractComponent} from '../../component-model/main/component/AbstractComponent';
import {EventDispatcher} from '@monument/core/Events/EventDispatcher';
import {ErrorEventArgs} from '@monument/core/Events/ErrorEventArgs';
import {EventSource} from '@monument/core/Events/EventSource';
import {Exception} from '../../core/main/exceptions/Exception';
import {CloseableStream} from './CloseableStream';


export abstract class AbstractOutputStream<T, TBase extends Writable & CloseableStream> extends AbstractComponent implements OutputStream<T> {
    private _isClosed: boolean = false;
    private _isFinished: boolean = false;
    private _failed: EventDispatcher<this, ErrorEventArgs> = this.createEventDispatcher();

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


    @Delegate()
    protected onBaseStreamClosed(): void {
        this._isClosed = true;
    }


    @Delegate()
    protected onBaseStreamFinished(): void {
        this._isFinished = true;
    }


    @Delegate()
    protected onBaseStreamFailed(error: Error): void {
        this._failed.dispatch(new ErrorEventArgs(Exception.cast(error)));
    }
}
