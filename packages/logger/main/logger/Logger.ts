import {Level} from '../level/Level';
import {Message} from '../message/Message';
import {Marker} from '../marker/Marker';
import {LoggerConfiguration} from './LoggerConfiguration';
import {Exception} from '@monument/core/main/exceptions/Exception';


export class Logger {
    private readonly _name: string;
    private readonly _configuration: LoggerConfiguration;


    public get name(): string {
        return this._name;
    }


    public constructor(name: string, configuration: LoggerConfiguration) {
        this._name = name;
        this._configuration = configuration;
    }


    public trace(text: string, marker?: Marker): Promise<void> {
        const message: Message = new Message(this.name, Level.TRACE, text, undefined, marker);

        return this.log(message);
    }


    public info(text: string, marker?: Marker): Promise<void> {
        const message: Message = new Message(this.name, Level.INFO, text, undefined, marker);

        return this.log(message);
    }


    public debug(text: string, marker?: Marker): Promise<void> {
        const message: Message = new Message(this.name, Level.DEBUG, text, undefined, marker);

        return this.log(message);
    }


    public warning(text: string, marker?: Marker): Promise<void> {
        const message: Message = new Message(this.name, Level.WARNING, text, undefined, marker);

        return this.log(message);
    }


    public error(text: string, error?: Exception, marker?: Marker): Promise<void> {
        const message: Message = new Message(this.name, Level.ERROR, text, error, marker);

        return this.log(message);
    }


    public fatal(text: string, error?: Exception, marker?: Marker): Promise<void> {
        const message: Message = new Message(this.name, Level.FATAL, text, error, marker);

        return this.log(message);
    }


    private async log(message: Message): Promise<void> {
        await Promise.all(this._configuration.appenders.toArray().map((appender) => {
            return appender.append(message);
        }));
    }
}
