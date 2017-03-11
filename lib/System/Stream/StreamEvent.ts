import Event from '../../Core/Events/Event';
import Encoding from '../Text/Encoding';
import {StreamEventType} from './types';
import Stream from './Stream';

/**
 * Represents event dispatched by streams.
 */
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


    // PUBLIC PROPERTIES

    /**
     * Gets or sets chunk of data that distributed through pipeline.
     */
    public dataChunk: any;

    /**
     * Gets or sets stream that is a data source in pipeline.
     */
    public sourceStream: Stream<any>;

    /**
     * Gets or sets stream that is a writable destination of pipeline or represents transforms layer.
     */
    public destinationStream: Stream<any>;
    
    /**
     * Gets or sets position of cursor in source stream.
     */
    public position: number;
    
    /**
     * Gets or sets position of cursor in source stream.
     */
    public length: number;


    public constructor(type: StreamEventType) {
        super(type);
    }
}
