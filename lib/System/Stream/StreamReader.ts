import {AsyncResult} from '../../Core/types';
import {StreamProxy} from './StreamProxy';
import {Stream} from './Stream';


export default class StreamReader<TStream extends Stream<any>, TChunk> extends StreamProxy<TStream, TChunk> {
    public async read(size?: number): AsyncResult<TChunk> {
        await this.openIfNecessary();

        return this._sourceStream.read(size);
    }
}