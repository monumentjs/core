import {StreamEventType} from './types';
import {EventEmitter} from '../../Core/Events/EventEmitter';
import {ErrorEvent} from '../../Core/Events/ErrorEvent';
import {StreamEvent} from './StreamEvent';
import {AsyncResult, IDisposable} from '../../Core/types';
import {assertArgumentBounds, assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {InvalidOperationException} from '../../Core/Exceptions/InvalidOperationException';
import {StreamNotReadableException} from './StreamNotReadableException';
import {StreamNotSeekableException} from './StreamNotSeekableException';
import {StreamNotWritableException} from './StreamNotWritableException';
import {Exception} from '../../Core/Exceptions/Exception';


export abstract class Stream<TChunk> extends EventEmitter implements IDisposable {
    protected _canTimeout: boolean = false;
    protected _canRead: boolean = true;
    protected _canWrite: boolean = true;
    protected _canSeek: boolean = true;

    protected _isReady: boolean = false;
    protected _isClosed: boolean = false;

    protected _isDisposing: boolean = false;
    protected _isDisposed: boolean = false;

    protected _position: number = 0;
    protected _length: number = 0;
    protected _readTimeout: number = 0;
    protected _writeTimeout: number = 0;

    private _closeOnEnd: boolean = true;


    public get isReady(): boolean {
        return this._isReady;
    }


    public get isClosed(): boolean {
        return this._isClosed;
    }


    public get canRead(): boolean {
        return this._canRead;
    }


    public get canSeek(): boolean {
        return this._canSeek;
    }


    public get canWrite(): boolean {
        return this._canWrite;
    }


    public get canTimeout(): boolean {
        return this._canTimeout;
    }


    public get length(): number {
        return this._length;
    }


    public get readTimeout(): number {
        this.ensureCanTimeout();

        return this._readTimeout;
    }


    public set readTimeout(value: number) {
        this.ensureCanTimeout();

        assertArgumentNotNull('value', value);

        this._readTimeout = value;
    }


    public get writeTimeout(): number {
        this.ensureCanTimeout();

        return this._writeTimeout;
    }


    public set writeTimeout(value: number) {
        this.ensureCanTimeout();

        assertArgumentNotNull('value', value);

        this._writeTimeout = value;
    }


    public get position(): number {
        return this._position;
    }


    public get closeOnEnd(): boolean {
        return this._closeOnEnd;
    }


    public set closeOnEnd(value: boolean) {
        assertArgumentNotNull('value', value);

        this._closeOnEnd = value;
    }


    public get isDisposing(): boolean {
        return this._isDisposing;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public async open(): AsyncResult {
        await this.onOpen();

        this._isReady = true;
        this._isClosed = false;

        this.notify(StreamEvent.READY);
    }


    public async close(): AsyncResult {
        this.ensureNotClosed();
        this.ensureIsReady();

        await this.onClose();

        this._isReady = false;
        this._isClosed = true;
        this._position = 0;

        this.notify(StreamEvent.CLOSE);
    }


    public async seek(position: number): AsyncResult {
        assertArgumentNotNull('position', position);

        this.ensureNotClosed();
        this.ensureCanSeek();
        this.ensureIsReady();

        this._position = await this.onSeek(position);

        this.notify(StreamEvent.SEEK);
    }


    public async read(size: number): AsyncResult<TChunk> {
        assertArgumentNotNull('size', size);
        assertArgumentBounds('size', size, 1, Infinity);

        let dataChunk: TChunk;

        this.ensureNotClosed();
        this.ensureCanRead();
        this.ensureIsReady();

        dataChunk = await this.onRead(size);

        if (dataChunk == null) {
            this.notify(StreamEvent.END);

            if (this.closeOnEnd) {
                await this.close();
            }
        }

        return dataChunk;
    }


    public async write(dataChunk: TChunk): AsyncResult<number> {
        assertArgumentNotNull('dataChunk', dataChunk);

        this.ensureNotClosed();
        this.ensureCanWrite();
        this.ensureIsReady();

        let offset: number;

        offset = await this.onWrite(dataChunk);

        this._position += offset;

        return offset;
    }


    public async flush(): AsyncResult {
        this.ensureNotClosed();
        this.ensureCanWrite();
        this.ensureIsReady();

        await this.onFlush();
    }


    public async dispose(): AsyncResult {
        if (this.isDisposing || this.isDisposed) {
            return;
        }

        this._isDisposing = true;

        if (!this.isClosed) {
            await this.flush();
            await this.close();
        }

        await this.onDispose();

        this.removeAllEventListeners();

        this._isDisposing = false;
        this._isDisposed = true;
    }


    protected abstract onOpen(): AsyncResult;
    protected abstract onClose(): AsyncResult;
    protected abstract onSeek(position: number): AsyncResult<number>;
    protected abstract onRead(size?: number): AsyncResult<TChunk>;
    protected abstract onWrite(dataChunk: TChunk): AsyncResult<number>;
    protected abstract onFlush(): AsyncResult;
    protected abstract onDispose(): AsyncResult;


    protected throwException(exception: Exception): void {
        this.dispatchEvent(new ErrorEvent(exception));

        throw exception;
    }


    protected ensureIsReady(): void {
        if (!this.isReady) {
            this.throwException(new InvalidOperationException(`Stream is not ready.`));
        }
    }


    protected ensureNotClosed(): void {
        if (this.isClosed) {
            this.throwException(new InvalidOperationException(`Stream is closed.`));
        }
    }


    protected ensureCanRead(): void {
        if (!this.canRead) {
            this.throwException(new StreamNotReadableException(`Stream is not readable.`));
        }
    }


    protected ensureCanSeek(): void {
        if (!this.canSeek) {
            this.throwException(new StreamNotSeekableException(`Stream does not support seeking.`));
        }
    }


    protected ensureCanWrite(): void {
        if (!this.canWrite) {
            this.throwException(new StreamNotWritableException(`Stream is not writable.`));
        }
    }


    protected ensureCanTimeout(): void {
        if (!this.canTimeout) {
            this.throwException(new InvalidOperationException(`Stream does not support timing out.`));
        }
    }


    protected notify(
        eventType: StreamEventType,
        dataChunk?: TChunk,
        sourceStream?: Stream<any>,
        destinationStream?: Stream<any>
    ): void {
        let streamEvent: StreamEvent = new StreamEvent(eventType);
    
        streamEvent.position = this.position;
        streamEvent.length = this.length;
        
        streamEvent.dataChunk = dataChunk;
        streamEvent.sourceStream = sourceStream;
        streamEvent.destinationStream = destinationStream;

        this.dispatchEvent(streamEvent);
    }
}
