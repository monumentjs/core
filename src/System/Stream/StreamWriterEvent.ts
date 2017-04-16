import Event from '../../Core/Events/Event';
import {StreamWriterEventType} from './types';
import {StreamReader} from './StreamReader';
import {StreamWriter} from './StreamWriter';


export default class StreamWriterEvent extends Event {
    public static PIPE: StreamWriterEventType = 'pipe';
    public static UNPIPE: StreamWriterEventType = 'unpipe';


    private _source: StreamReader<any, any>;
    private _target: StreamWriter<any, any>;


    public get source(): StreamReader<any, any> {
        return this._source;
    }


    public get target(): StreamWriter<any, any> {
        return this._target;
    }


    public initialize(source: StreamReader<any, any>, target: StreamWriter<any, any>) {
        this._source = source;
        this._target = target;
    }
}