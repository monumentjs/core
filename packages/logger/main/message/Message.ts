import {Exception} from '@monument/core/main/exceptions/Exception';
import {DateTime} from '@monument/core/main/time/DateTime';
import {Marker} from '../marker/Marker';
import {Level} from '../level/Level';


export class Message {
    private readonly _level: Level;
    private readonly _text: string;
    private readonly _loggerName: string;
    private readonly _error?: Error;
    private readonly _marker: Marker | undefined;
    private readonly _timestamp: DateTime = DateTime.now;


    public get level(): Level {
        return this._level;
    }


    public get loggerName(): string {
        return this._loggerName;
    }


    public get marker(): Marker | undefined {
        return this._marker;
    }


    public get error(): Error | undefined {
        return this._error;
    }


    public get text(): string {
        return this._text;
    }


    public get timestamp(): DateTime {
        return this._timestamp;
    }


    public constructor(loggerName: string, level: Level, text: string, error?: Exception, marker?: Marker) {
        this._loggerName = loggerName;
        this._level = level;
        this._text = text;
        this._error = error;
        this._marker = marker;
    }
}
