import {LoggerBase} from './LoggerBase';
import {ILogRecord} from './ILogRecord';
import {AsyncResult} from '../../Core/types';
import {assertArgumentNotNull, assertArgumentType} from '../../Core/Assertion/Assert';
import {StreamWriter} from '../Stream/StreamWriter';


export default class LogWriter extends LoggerBase {
    private _targetWriter: StreamWriter<any, string>;


    public get targetWriter(): StreamWriter<any, string> {
        return this._targetWriter;
    }


    public set targetWriter(value: StreamWriter<any, string>) {
        assertArgumentNotNull('value', value);
        assertArgumentType('value', value, StreamWriter);

        this._targetWriter = value;
    }


    public constructor(streamWriter: StreamWriter<any, string>) {
        super();

        this.targetWriter = streamWriter;
    }


    protected async doWrite(record: ILogRecord): AsyncResult<void> {
        await this._targetWriter.write(record.toString());
    }
}