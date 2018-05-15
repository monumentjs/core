import {Logger} from '../logger/Logger';
import {Level} from '../level/Level';
import {Message} from '../message/Message';
import {LogEvent} from './LogEvent';
import {Marker} from '../marker/Marker';


export class DefaultLogEvent implements LogEvent {
    private readonly _message: Message;
    private readonly _level: Level;
    private readonly _logger: Logger;
    private readonly _marker: Marker | undefined;


    public get level(): Level {
        return this._level;
    }


    public get loggerName(): string {
        return this._logger.name;
    }


    public get message(): Message {
        return this._message;
    }


    public get marker(): Marker | undefined {
        return this._marker;
    }


    public constructor(logger: Logger, level: Level, message: Message, marker?: Marker) {
        this._logger = logger;
        this._level = level;
        this._message = message;
        this._marker = marker;
    }
}
