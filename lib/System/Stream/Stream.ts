import {StreamEventType} from './types';
import EventEmitter from '../../Core/Events/EventEmitter';
import ErrorEvent from '../../Core/Events/ErrorEvent';
import Encoding from '../Text/Encoding';
import List from '../../Core/Collections/List';
import StreamEvent from './StreamEvent';
import {AsyncResult, IDisposable} from '../../Core/types';
import {assertArgumentBounds, assertArgumentNotNull, assertArgumentType} from '../../Assertion/Assert';
import InvalidOperationException from '../../Core/Exceptions/InvalidOperationException';
import StreamNotReadableException from './StreamNotReadableException';
import StreamNotSeekableException from './StreamNotSeekableException';
import StreamNotWritableException from './StreamNotWritableException';
import Exception from '../../Core/Exceptions/Exception';


export abstract class Stream<TChunk> extends EventEmitter implements IDisposable {
    /**
     * Makes stream only readable.
     * @param stream Original stream.
     */
    public static readOnly(stream: Stream<any>): void {
        stream._canRead = true;
        stream._canWrite = false;
    }

    /**
     * Makes stream only writable.
     * @param stream Original stream.
     */
    public static writeOnly(stream: Stream<any>): void {
        stream._canRead = false;
        stream._canWrite = true;
    }


    protected _canRead: boolean = true;
    protected _canWrite: boolean = true;
    protected _canSeek: boolean = true;

    protected _isReady: boolean = false;
    protected _isClosed: boolean = false;
    protected _isPaused: boolean = true;

    protected _isDisposing: boolean = false;
    protected _isDisposed: boolean = false;

    protected _encoding: Encoding = Encoding.UTF8;

    protected _bufferSize: number = 1;
    protected _position: number = 0;
    protected _length: number = 0;

    protected _destinationStreams: List<Stream<any>> = new List<Stream<any>>();

    protected _closeOnEnd: boolean = true;


    // PUBLIC GETTERS AND SETTERS


    public get encoding(): Encoding {
        return this._encoding;
    }


    public get isReady(): boolean {
        return this._isReady;
    }


    public get isPaused(): boolean {
        return this._isPaused;
    }


    public get isFlowing(): boolean {
        return !this.isPaused && !this.isDisposing && !this.isDisposed && !this.isClosed;
    }


    public get isClosed(): boolean {
        return this._isClosed;
    }


    public get isDisposing(): boolean {
        return this._isDisposing;
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


    public get bufferSize(): number {
        return this._bufferSize;
    }


    public set bufferSize(value: number) {
        assertArgumentNotNull('value', value);
        assertArgumentBounds('value', value, 1, Infinity);

        this._bufferSize = value;
    }


    public get closeOnEnd(): boolean {
        return this._closeOnEnd;
    }


    public set closeOnEnd(value: boolean) {
        assertArgumentNotNull('value', value);

        this._closeOnEnd = value;
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

        this._isPaused = true;

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


    public async pause(): AsyncResult<void> {
        await this.onPause();

        this._isPaused = true;

        this.notify(StreamEvent.PAUSE);
    }


    public async resume(): AsyncResult<void> {
        this.throwIfClosed();
        this.throwIfNotReadable();
        this.throwIfNotReady();

        await this.onResume();

        this._isPaused = false;

        this.notify(StreamEvent.RESUME);

        while (this.isFlowing) {
            await this.read();
        }
    }


    public async read(size: number = this.bufferSize): AsyncResult<TChunk> {
        assertArgumentNotNull('size', size);
        assertArgumentBounds('size', size, 1, Infinity);

        let dataChunk: TChunk;

        this.throwIfClosed();
        this.throwIfNotReadable();
        this.throwIfNotReady();

        dataChunk = await this.onRead(size);

        if (dataChunk != null) {
            await this.distributeData(dataChunk);
        } else {
            await this.pause();

            this.notify(StreamEvent.END);

            if (this.closeOnEnd) {
                await this.close();
            }
        }

        return dataChunk;
    }


    public async write(dataChunk: TChunk): AsyncResult<void> {
        assertArgumentNotNull('dataChunk', dataChunk);

        this.throwIfClosed();
        this.throwIfNotWritable();
        this.throwIfNotReady();

        let offset: number = await this.onWrite(dataChunk);

        await this.seek(this.position + offset);

        await this.distributeData(dataChunk);
    }


    public async flush(): AsyncResult<void> {
        this.throwIfClosed();
        this.throwIfNotWritable();
        this.throwIfNotReady();

        await this.onFlush();
    }


    public async dispose(): AsyncResult<void> {
        if (this._isDisposing || this.isDisposed) {
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


    public pipe(destinationStream: Stream<any>): Stream<any> {
        assertArgumentNotNull('destinationStream', destinationStream);
        assertArgumentType('destinationStream', destinationStream, Stream);

        if (!destinationStream.canWrite) {
            throw new InvalidOperationException('Destination stream is not writable.');
        }

        this._destinationStreams.add(destinationStream);

        destinationStream.notify(StreamEvent.PIPE, undefined, this, destinationStream);

        return destinationStream;
    }


    public unpipe(destinationStream: Stream<any>): void {
        assertArgumentNotNull('destinationStream', destinationStream);

        this._destinationStreams.remove(destinationStream);

        destinationStream.notify(StreamEvent.UNPIPE, undefined, this, destinationStream);
    }


    protected abstract async onOpen(): AsyncResult<void>;
    protected abstract async onClose(): AsyncResult<void>;
    protected abstract async onSeek(position: number): AsyncResult<number>;
    protected abstract async onPause(): AsyncResult<void>;
    protected abstract async onResume(): AsyncResult<void> ;
    protected abstract async onRead(size?: number): AsyncResult<TChunk>;
    protected abstract async onWrite(dataChunk: TChunk): AsyncResult<number>;
    protected abstract async onFlush(): AsyncResult<void>;
    protected abstract async onDispose(): AsyncResult<void>;


    protected async distributeData(dataChunk: any): AsyncResult<void> {
        await Promise.all(this._destinationStreams.select(async (destinationStream: Stream<any>) => {
            return await destinationStream.write(dataChunk);
        }));
    }


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
