import {LoggerBase} from './LoggerBase';
import {ILogRecord} from './ILogRecord';
import {AsyncResult} from '../../Core/types';
import {assertArgumentNotNull, assertArgumentType} from '../../Assertion/Assert';
import StreamWriter from '../Stream/StreamWriter';
import {Stream} from '../Stream/Stream';


export default class LogWriter extends LoggerBase {
    private _streamWriter: StreamWriter<Stream<any>, string>;


    public get streamWriter(): StreamWriter<Stream<any>, string> {
        return this._streamWriter;
    }


    public set streamWriter(value: StreamWriter<Stream<any>, string>) {
        assertArgumentNotNull('value', value);
        assertArgumentType('value', value, StreamWriter);

        this._streamWriter = value;
    }


    public constructor(streamWriter: StreamWriter<Stream<any>, string>) {
        super();

        this.streamWriter = streamWriter;
    }


    protected async onWrite(record: ILogRecord): AsyncResult<void> {
        await this._streamWriter.write(record.toString());
    }
}