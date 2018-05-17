import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {ListMap} from '@monument/collections/main/ListMap';
import {Marker} from '../marker/Marker';
import {Level} from '../level/Level';


export class Message {
    private readonly _level: Level;
    private readonly _text: string;
    private readonly _loggerName: string;
    private readonly _error?: Error;
    private readonly _marker: Marker | undefined;
    private readonly _values: ListMap<string, string> = new ListMap();


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


    public get values(): ReadOnlyMap<string, string> {
        return this._values;
    }


    public constructor(loggerName: string, level: Level, text: string, error?: Error, marker?: Marker) {
        this._loggerName = loggerName;
        this._level = level;
        this._text = text;
        this._error = error;
        this._marker = marker;

        this._values.put('text', text);
        this._values.put('level', Level[level]);
        this._values.put('loggerName', loggerName);
        this._values.put('error', error && error.stack || '');
    }
}
