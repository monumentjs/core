import {Stream} from '../Stream/Stream';
import IOException from './IOException';


export default class EndOfStreamExceptions extends IOException {
    public readonly stream: Stream<any>;


    public constructor(stream: Stream<any>) {
        super(`Reached the end of the stream.`);

        this.stream = stream;
    }
}
