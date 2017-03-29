import Event from '../../Core/Events/Event';
import {StreamEventType} from './types';
import {Stream} from './Stream';


export default class StreamEvent extends Event {
    public static READY: StreamEventType = 'ready';
    public static PAUSE: StreamEventType = 'pause';
    public static RESUME: StreamEventType = 'resume';
    public static END: StreamEventType = 'end';
    public static CLOSE: StreamEventType = 'close';
    public static ERROR: StreamEventType = 'error';
    public static PIPE: StreamEventType = 'pipe';
    public static UNPIPE: StreamEventType = 'unpipe';
    public static SEEK: StreamEventType = 'seek';


    public dataChunk: any;
    public sourceStream: Stream<any>;
    public destinationStream: Stream<any>;
    public position: number;
    public length: number;


    public constructor(type: StreamEventType) {
        super(type);
    }
}
