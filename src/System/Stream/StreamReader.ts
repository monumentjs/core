import {assertArgumentBounds, assertArgumentNotNull, assertArgumentType} from '../../Core/Assertion/Assert';
import {AsyncResult} from '../../Core/types';
import List from '../../Core/Collections/List';
import {StreamWriter} from './StreamWriter';
import StreamReaderEvent from './StreamReaderEvent';
import StreamWriterEvent from './StreamWriterEvent';
import EventEmitter from '../../Core/Events/EventEmitter';


export abstract class StreamReader<TStream, TChunk> extends EventEmitter {
    protected _destinationStreams: List<StreamWriter<any, TChunk>>;

    private _isPaused: boolean;
    private _bufferSize: number;
    private _sourceStream: TStream;


    public get sourceStream(): TStream {
        return this._sourceStream;
    }


    public get bufferSize(): number {
        return this._bufferSize;
    }


    public set bufferSize(value: number) {
        this._bufferSize = value;
    }


    public get isPaused(): boolean {
        return this._isPaused;
    }


    public constructor(sourceStream: TStream) {
        assertArgumentNotNull('sourceStream', sourceStream);

        super();

        this._bufferSize = 1;
        this._isPaused = true;
        this._destinationStreams = new List<StreamWriter<any, TChunk>>();
        this._sourceStream = sourceStream;
    }


    public async read(length: number): AsyncResult<TChunk> {
        assertArgumentNotNull('length', length);
        assertArgumentBounds('length', length, 1, Infinity);

        let dataChunk: TChunk = await this.onRead(length);

        if (dataChunk == null) {
            await this.pause();

            this.dispatchEvent(new StreamReaderEvent(StreamReaderEvent.END));
        } else {
            await this.distributeData(dataChunk);
        }

        return dataChunk;
    }


    public async pause(): AsyncResult<void> {
        await this.onPause();

        this._isPaused = true;

        this.dispatchEvent(new StreamReaderEvent(StreamReaderEvent.PAUSE));
    }


    public async resume(): AsyncResult<void> {
        await this.onResume();

        this._isPaused = false;

        this.dispatchEvent(new StreamReaderEvent(StreamReaderEvent.RESUME));

        while (!this.isPaused) {
            await this.read(this.bufferSize);
        }
    }


    public pipe(destinationStream: StreamWriter<any, TChunk>): StreamWriter<any, TChunk> {
        assertArgumentNotNull('destinationStream', destinationStream);
        assertArgumentType('destinationStream', destinationStream, StreamWriter);

        this._destinationStreams.add(destinationStream);

        destinationStream.dispatchEvent((() => {
            let event = new StreamWriterEvent(StreamWriterEvent.PIPE);

            event.initialize(this, destinationStream);

            return event;
        })());

        return destinationStream;
    }


    public unpipe(destinationStream: StreamWriter<any, TChunk>): void {
        assertArgumentNotNull('destinationStream', destinationStream);

        this._destinationStreams.remove(destinationStream);

        destinationStream.dispatchEvent((() => {
            let event = new StreamWriterEvent(StreamWriterEvent.UNPIPE);

            event.initialize(this, destinationStream);

            return event;
        })());
    }


    protected abstract onRead(length: number): AsyncResult<TChunk>;
    protected abstract onPause(): AsyncResult<void>;
    protected abstract onResume(): AsyncResult<void>;
    protected abstract onClose(): AsyncResult<void>;


    protected async distributeData(dataChunk: TChunk): AsyncResult<void> {
        await Promise.all(this._destinationStreams.select(async (destinationStream: StreamWriter<any, TChunk>) => {
            return await destinationStream.write(dataChunk);
        }));
    }
}