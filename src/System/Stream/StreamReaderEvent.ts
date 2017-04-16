import Event from '../../Core/Events/Event';
import {StreamReaderEventType} from './types';


export default class StreamReaderEvent extends Event {
    public static readonly PAUSE: StreamReaderEventType = 'pause';
    public static readonly RESUME: StreamReaderEventType = 'resume';
    public static readonly END: StreamReaderEventType = 'end';
}