import Event from '../../Core/Events/Event';
import {StreamEventType} from './types';
import {Stream} from './Stream';


export default class StreamEvent extends Event {
    public static READY: StreamEventType = 'ready';
    public static END: StreamEventType = 'end';
    public static CLOSE: StreamEventType = 'close';
    public static ERROR: StreamEventType = 'error';
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
