import {EventEmitter} from '../../Core/Events/EventEmitter';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export abstract class StreamWriter<TStream, TChunk> extends EventEmitter {
    private _bufferSize: number;
    private _targetStream: TStream;


    public get targetStream(): TStream {
        return this._targetStream;
    }


    public get bufferSize(): number {
        return this._bufferSize;
    }


    public set bufferSize(value: number) {
        this._bufferSize = value;
    }


    public constructor(targetStream: TStream) {
        assertArgumentNotNull('targetStream', targetStream);

        super();

        this._bufferSize = 1;
        this._targetStream = targetStream;
    }


    public async write(chunk: TChunk): Promise<void> {
        await this.onWrite(chunk);
    }


    protected abstract onWrite(chunk: TChunk): Promise<number>;
}
