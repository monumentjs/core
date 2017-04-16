import {StreamEventType} from './types';
import EventEmitter from '../../Core/Events/EventEmitter';
import ErrorEvent from '../../Core/Events/ErrorEvent';
import StreamEvent from './StreamEvent';
import {AsyncResult, IDisposable} from '../../Core/types';
import {assertArgumentBounds, assertArgumentNotNull} from '../../Core/Assertion/Assert';
import InvalidOperationException from '../../Core/Exceptions/InvalidOperationException';
import StreamNotReadableException from './StreamNotReadableException';
import StreamNotSeekableException from './StreamNotSeekableException';
import StreamNotWritableException from './StreamNotWritableException';
import Exception from '../../Core/Exceptions/Exception';


export abstract class Stream<TChunk> extends EventEmitter implements IDisposable {
    public static setReadable(stream: Stream<any>, readable: boolean): void {
        stream._canRead = readable;
    }


    public static setWritable(stream: Stream<any>, writable: boolean): void {
        stream._canWrite = writable;
    }


    public static setSeekable(stream: Stream<any>, seekable: boolean): void {
        stream._canSeek = seekable;
    }


    protected _canRead: boolean = true;
    protected _canWrite: boolean = true;
    protected _canSeek: boolean = true;

    protected _isReady: boolean = false;
    protected _isClosed: boolean = false;

    protected _isDisposing: boolean = false;
    protected _isDisposed: boolean = false;

    protected _position: number = 0;
    protected _length: number = 0;

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


    public get length(): number {
        return this._length;
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


    public async open(): AsyncResult<void> {
        await this.onOpen();

        this._isReady = true;
        this._isClosed = false;

        this.notify(StreamEvent.READY);
    }


    public async close(): AsyncResult<void> {
        this.throwIfClosed();
        this.throwIfNotReady();

        await this.onClose();

        this._isReady = false;
        this._isClosed = true;
        this._position = 0;

        this.notify(StreamEvent.CLOSE);
    }


    public async seek(position: number): AsyncResult<void> {
        assertArgumentNotNull('position', position);

        this.throwIfClosed();
        this.throwIfNotSeekable();
        this.throwIfNotReady();

        this._position = await this.onSeek(position);

        this.notify(StreamEvent.SEEK);
    }


    public async read(size: number): AsyncResult<TChunk> {
        assertArgumentNotNull('size', size);
        assertArgumentBounds('size', size, 1, Infinity);

        let dataChunk: TChunk;

        this.throwIfClosed();
        this.throwIfNotReadable();
        this.throwIfNotReady();

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

        this.throwIfClosed();
        this.throwIfNotWritable();
        this.throwIfNotReady();

        let offset: number;

        offset = await this.onWrite(dataChunk);

        this._position += offset;

        return offset;
    }


    public async flush(): AsyncResult<void> {
        this.throwIfClosed();
        this.throwIfNotWritable();
        this.throwIfNotReady();

        await this.onFlush();
    }


    public async dispose(): AsyncResult<void> {
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


    protected abstract onOpen(): AsyncResult<void>;
    protected abstract onClose(): AsyncResult<void>;
    protected abstract onSeek(position: number): AsyncResult<number>;
    protected abstract onRead(size?: number): AsyncResult<TChunk>;
    protected abstract onWrite(dataChunk: TChunk): AsyncResult<number>;
    protected abstract onFlush(): AsyncResult<void>;
    protected abstract onDispose(): AsyncResult<void>;


    protected throwException(exception: Exception): void {
        this.dispatchEvent(new ErrorEvent(exception));

        throw exception;
    }


    protected throwIfNotReady(): void {
        if (!this.isReady) {
            this.throwException(new InvalidOperationException(`Stream is not ready.`));
        }
    }


    protected throwIfClosed(): void {
        if (this.isClosed) {
            this.throwException(new InvalidOperationException(`Stream is closed.`));
        }
    }


    protected throwIfNotReadable(): void {
        if (!this.canRead) {
            this.throwException(new StreamNotReadableException(`Stream is not readable.`));
        }
    }


    protected throwIfNotSeekable(): void {
        if (!this.canSeek) {
            this.throwException(new StreamNotSeekableException(`Stream does not support seeking.`));
        }
    }


    protected throwIfNotWritable(): void {
        if (!this.canWrite) {
            this.throwException(new StreamNotWritableException(`Stream is not writable.`));
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
