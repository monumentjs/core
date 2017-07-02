import {Readable as ReadableStream} from 'stream';
import {IStreamAdapter} from '../../Stream/IStreamAdapter';
import {Readable} from '../../Stream/Readable';
import {Assert} from '../../../Core/Assertion/Assert';
import {Method} from '../../../Core/Language/Decorators/Method';
import {IDisposable} from '../../../Core/types';
import {DeferredObject} from '../../../Core/Async/DeferredObject';
import {IOException} from '../IOException';
import {EndOfStreamException} from '../EndOfStreamException';


export abstract class ReadStreamAdapter<TStream extends ReadableStream, TIn, TOut>
    extends
        Readable<TIn, TOut>
    implements
        IStreamAdapter<TStream>, IDisposable {

    private _isDisposed: boolean;
    private _isClosed: boolean;
    private _baseStream: TStream;


    public get baseStream(): TStream {
        return this._baseStream;
    }


    public get isReadable(): boolean {
        return this.baseStream.readable;
    }


    public get isPaused(): boolean {
        return this.baseStream.isPaused();
    }


    public get isClosed(): boolean {
        return this._isClosed;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public constructor(baseStream: TStream) {
        Assert.argument('baseStream', baseStream).notNull();

        super();

        this._isDisposed = false;
        this._isClosed = false;
        this._baseStream = baseStream;

        this.baseStream.on('close', this.onClose);
        this.baseStream.on('end', this.onEnd);
    }


    public dispose(): void {
        this._isDisposed = true;
    }


    @Method.attached()
    protected onClose(): void {
        this._isClosed = true;
    }


    @Method.attached()
    protected onEnd(): void {
        this.setEnded(true);
    }


    protected abstract transform(input: TIn): Promise<TOut>;


    protected async _read(): Promise<TIn> {
        let deferred: DeferredObject<TIn> = new DeferredObject<TIn>();

        if (this.isEnded) {
            deferred.resolve(null);
        } else if (this.isClosed) {
            deferred.reject(new EndOfStreamException(`Unable to read from closed stream.`));
        } else {
            let input: TIn = this.baseStream.read();

            if (input != null) {
                deferred.resolve(input);
            } else {
                this.scheduleRead(deferred);
            }
        }

        return deferred.promise;
    }


    private scheduleRead(deferred: DeferredObject<TIn>): void {
        let onReadable = () => {
            let input: TIn = this.baseStream.read();

            deferred.resolve(input);

            removeListeners();
        };

        let onError = (error: NodeJS.ErrnoException) => {
            let ex: IOException = IOException.fromError(error);

            deferred.reject(ex);

            removeListeners();
        };

        let removeListeners = () => {
            this.baseStream.removeListener('readable', onReadable);
            this.baseStream.removeListener('error', onError);
        };

        this.baseStream.once('readable', onReadable);
        this.baseStream.once('error', onError);
    }
}
