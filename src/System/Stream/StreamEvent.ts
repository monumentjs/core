import {Event} from '../../Core/Events/Event';


export type StreamEventType = 'open'|'close'|'readable'|'data'|'end'|'finish'|'drain'|'error'|'pipe'|'unpipe';


export class StreamEvent extends Event {
    public static readonly OPEN: StreamEventType = 'open';
    public static readonly CLOSE: StreamEventType = 'close';
    public static readonly READABLE: StreamEventType = 'readable';
    public static readonly DATA: StreamEventType = 'data';
    public static readonly END: StreamEventType = 'end';
    public static readonly FINISH: StreamEventType = 'finish';
    public static readonly DRAIN: StreamEventType = 'drain';
    public static readonly ERROR: StreamEventType = 'error';
    public static readonly PIPE: StreamEventType = 'pipe';
    public static readonly UNPIPE: StreamEventType = 'unpipe';


    public chunk: any;
}
