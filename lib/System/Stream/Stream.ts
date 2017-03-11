import {StreamEventType} from './types';
import EventEmitter from '../../Core/Events/EventEmitter';
import ErrorEvent from '../../Core/Events/ErrorEvent';
import Encoding from '../Text/Encoding';
import List from '../../Core/Collections/List';
import StreamEvent from './StreamEvent';
import {AsyncResult, IDisposable} from '../../Core/types';

/**
 * Represents a stream of data.
 * Data can be written or read by chunks.
 * Streams allow to organize chained data flow from source to destination.
 */
export default class Stream<TChunk> extends EventEmitter implements IDisposable {
    /**
     * Makes stream only readable.
     * @param stream Original stream.
     */
    public static readOnly(stream: Stream<any>) {
        stream._canRead = true;
        stream._canWrite = false;
    }

    /**
     * Makes stream only writable.
     * @param stream Original stream.
     */
    public static writeOnly(stream: Stream<any>) {
        stream._canRead = false;
        stream._canWrite = true;
    }


    // PROTECTED PROPERTIES


    protected _canRead: boolean = true;
    protected _canWrite: boolean = true;
    protected _canSeek: boolean = true;

    protected _isReady: boolean = false;
    protected _isClosed: boolean = false;
    protected _isPaused: boolean = true;

    protected _isDisposing: boolean = false;
    protected _isDisposed: boolean = false;

    protected _encoding: Encoding = Encoding.BINARY;

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
        return !this._isPaused && !this._isDisposing && !this._isDisposed && !this._isClosed;
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


    public set position(value: number) {
        if (value < this.length) {
            this._position = value;
        } else {
            this._position = this.length;
        }
    }


    public get closeOnEnd(): boolean {
        return this._closeOnEnd;
    }


    public set closeOnEnd(value: boolean) {
        this._closeOnEnd = value;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    // PUBLIC METHODS

    /**
     * Opens current stream. Stream can be used only after having been opened.
     * Dispatches 'ready' event after successful opening.
     */
    public async open(): AsyncResult<void> {
        await this.onOpen();

        this._isReady = true;
        this._isClosed = false;

        this.notify(StreamEvent.READY);
    }

    /**
     * Closes current stream. After being closed stream cannot be used.
     */
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

    /**
     * Moves cursor position to a given value.
     */
    public async seek(position: number): AsyncResult<void> {
        this.throwIfClosed();
        this.throwIfNotSeekable();
        this.throwIfNotReady();

        this.position = await this.onSeek(position);

        this.notify(StreamEvent.SEEK);
    }

    /**
     * Reads chunk of data from current stream.
     */
    public async read(size: number = this._bufferSize): AsyncResult<TChunk> {
        let dataChunk: TChunk;

        this.throwIfClosed();
        this.throwIfNotReadable();
        this.throwIfNotReady();

        dataChunk = await this.onRead(size);

        if (dataChunk !== undefined) {
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

    /**
     * Pauses automatic data flow.
     */
    public async pause(): AsyncResult<void> {
        await this.onPause();

        this._isPaused = true;

        this.notify(StreamEvent.PAUSE);
    }

    /**
     * Resumes automatic data flow.
     */
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

    /**
     * Writes a chunk of data to current stream.
     */
    public async write(dataChunk: TChunk): AsyncResult<void> {
        this.throwIfClosed();
        this.throwIfNotWritable();
        this.throwIfNotReady();

        await this.onWrite(dataChunk);

        await this.distributeData(dataChunk);
    }

    /**
     * Flushes all internal buffers to underlined system.
     */
    public async flush(): AsyncResult<void> {
        this.throwIfClosed();
        this.throwIfNotWritable();
        this.throwIfNotReady();

        await this.onFlush();
    }

    /**
     * Flushes all internal buffers, closes stream and frees all resources.
     */
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

        this.clearEventListeners();

        this._isDisposing = false;
        this._isDisposed = true;
    }

    /**
     * Adds destination stream to the list of destinations.
     * This will start automatic writing of data chunks to given stream.
     */
    public pipe(destinationStream: Stream<any>): Stream<any> {
        if (!destinationStream.canWrite) {
            throw new Error('Destination stream is not writable.');
        }

        this._destinationStreams.add(destinationStream);

        destinationStream.notify(StreamEvent.PIPE, undefined, this, destinationStream);

        return destinationStream;
    }

    /**
     * Removes destination stream from list of destinations.
     * This will stop automatic writing of data chunks to given stream.
     */
    public unpipe(destinationStream: Stream<any>) {
        this._destinationStreams.remove(destinationStream);

        destinationStream.notify(StreamEvent.UNPIPE, undefined, this, destinationStream);
    }


    // PROTECTED METHODS


    /**
     * Writes data chunk to all destination streams added with `pipe` method.
     * @param dataChunk Data chunk that must be written to all destination streams.
     */
    protected async distributeData(dataChunk: any): AsyncResult<void> {
        await Promise.all(this._destinationStreams.select(async (destinationStream: Stream<any>) => {
            return await destinationStream.write(dataChunk);
        }));
    }

    /**
     * When overridden in derived class, opens current stream.
     */
    protected async onOpen(): AsyncResult<void> {
        return undefined;
    }

    /**
     * When overridden in derived class, closes of current stream.
     */
    protected async onClose(): AsyncResult<void> {
        return undefined;
    }

    /**
     * When overridden in derived class, sets cursor position in current stream.
     * @returns New actual position of cursor in current stream. May differ from specified value.
     */
    protected async onSeek(position: number): AsyncResult<number> {
        return position;
    }

    /**
     * When overridden in derived class, pauses automatic streaming of current stream.
     */
    protected async onPause(): AsyncResult<void> {
        return undefined;
    }

    /**
     * When overridden in derived class, resumes automatic streaming of current stream.
     */
    protected async onResume(): AsyncResult<void> {
        return undefined;
    }

    /**
     * When overridden in derived class, reads chunk of data from current stream.
     * When this method returns `undefined` this means that there are no more data to read.
     */
    protected async onRead(size?: number): AsyncResult<TChunk> {
        return undefined;
    }

    /**
     * When overridden in derived class, writes chunk of data to current stream.
     */
    protected async onWrite(dataChunk: TChunk): AsyncResult<void> {
        return undefined;
    }

    /**
     * When overridden in derived class, flushes all internal buffers to current stream.
     */
    protected async onFlush(): AsyncResult<void> {
        return undefined;
    }

    /**
     * Dispatches `error` event and throws an error after that.
     */
    protected onError(error: Error) {
        this.dispatchEvent(new ErrorEvent(error));
        throw error;
    }

    /**
     * When overridden in derived class, frees all internal resources.
     */
    protected async onDispose(): AsyncResult<void> {
        return undefined;
    }

    /**
     * Checks current stream is opened and ready. If not, it dispatches `error` event and throw error.
     */
    protected throwIfNotReady() {
        if (!this._isReady) {
            this.onError(new Error(`Stream is not ready.`));
        }
    }

    /**
     * Checks current stream is not closed. If so, it dispatches `error` event and throw error.
     */
    protected throwIfClosed() {
        if (this._isClosed) {
            this.onError(new Error(`Stream is closed.`));
        }
    }

    /**
     * Checks current stream is readable. If not, it dispatches `error` event and throw error.
     */
    protected throwIfNotReadable() {
        if (!this._canRead) {
            this.onError(new Error(`Stream is not readable.`));
        }
    }

    /**
     * Checks current stream supports seeking. If not, it dispatches `error` event and throw error.
     */
    protected throwIfNotSeekable() {
        if (!this._canSeek) {
            this.onError(new Error(`Stream does not support seeking.`));
        }
    }

    /**
     * Checks current stream is writable. If not, it dispatches `error` event and throw error.
     */
    protected throwIfNotWritable() {
        if (!this._canWrite) {
            this.onError(new Error(`Stream is not writable.`));
        }
    }

    /**
     * Dispatches event of specified type.
     */
    protected notify(
        eventType: StreamEventType,
        dataChunk?: TChunk,
        sourceStream?: Stream<any>,
        destinationStream?: Stream<any>
    ) {
        let streamEvent: StreamEvent = new StreamEvent(eventType);
    
        streamEvent.position = this.position;
        streamEvent.length = this.length;
        
        streamEvent.dataChunk = dataChunk;
        streamEvent.sourceStream = sourceStream;
        streamEvent.destinationStream = destinationStream;

        this.dispatchEvent(streamEvent);
    }
}
