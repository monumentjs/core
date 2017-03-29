import {AsyncResult} from '../../Core/types';
import {StreamProxy} from './StreamProxy';
import {Stream} from './Stream';


export default class StreamWriter<TStream extends Stream<any>, TChunk> extends StreamProxy<TStream, TChunk> {
    public async write(dataChunk: TChunk): AsyncResult<void> {
        await this.openIfNecessary();

        return this._sourceStream.write(dataChunk);
    }
}