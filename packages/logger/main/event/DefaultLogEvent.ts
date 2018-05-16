import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {ListMap} from '@monument/collections/main/ListMap';
import {Level} from '../level/Level';
import {Message} from '../message/Message';
import {LogEvent} from './LogEvent';
import {Marker} from '../marker/Marker';


export class DefaultLogEvent implements LogEvent {
    private readonly _message: Message;
    private readonly _level: Level;
    private readonly _loggerName: string;
    private readonly _marker: Marker | undefined;
    private readonly _values: ListMap<string, string> = new ListMap();


    public get level(): Level {
        return this._level;
    }


    public get loggerName(): string {
        return this._loggerName;
    }


    public get message(): Message {
        return this._message;
    }


    public get marker(): Marker | undefined {
        return this._marker;
    }


    public get values(): ReadOnlyMap<string, string> {
        return this._values;
    }


    public constructor(loggerName: string, level: Level, message: Message, marker?: Marker) {
        this._loggerName = loggerName;
        this._level = level;
        this._message = message;
        this._marker = marker;

        this._values.put('text', this.message.text);
        this._values.put('level', Level[this.level]);
        this._values.put('loggerName', this.loggerName);
        this._values.put('error', this.message.error ? this.message.error.stack || '' : '');
    }
}
