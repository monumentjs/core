import {Stream} from './Stream';
import {assertArgumentNotNull, assertArgumentType} from '../../Assertion/Assert';
import {AsyncResult} from '../../Core/types';


export abstract class StreamProxy<TStream extends Stream<any>, TChunk> {
    protected _sourceStream: TStream;


    public get sourceStream(): TStream {
        return this._sourceStream;
    }


    public get position(): number {
        return this._sourceStream.position;
    }


    public get length(): number {
        return this._sourceStream.length;
    }


    public constructor(sourceStream: TStream) {
        assertArgumentNotNull('sourceStream', sourceStream);
        assertArgumentType('sourceStream', sourceStream, Stream);

        this._sourceStream = sourceStream;
    }


    public async seek(position: number): AsyncResult<void> {
        await this.openIfNecessary();

        return this._sourceStream.seek(position);
    }


    protected async openIfNecessary(): AsyncResult<void> {
        if (!this._sourceStream.isReady) {
            await this._sourceStream.open();
        }
    }
}