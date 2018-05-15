import {Level} from '../level/Level';
import {Message} from '../message/Message';
import {Parameter} from '../message/Parameter';
import {DefaultLogEvent} from '../event/DefaultLogEvent';
import {LoggerConfiguration} from './LoggerConfiguration';


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


    public trace(format: string, ...parameters: Parameter[]): Promise<void> {
        const message: Message = new Message(format, undefined, parameters);

        return this.log(Level.TRACE, message);
    }


    public info(format: string, ...parameters: Parameter[]): Promise<void> {
        const message: Message = new Message(format, undefined, parameters);

        return this.log(Level.INFO, message);
    }


    public debug(format: string, ...parameters: Parameter[]): Promise<void> {
        const message: Message = new Message(format, undefined, parameters);

        return this.log(Level.DEBUG, message);
    }


    public warning(format: string, ...parameters: Parameter[]): Promise<void> {
        const message: Message = new Message(format, undefined, parameters);

        return this.log(Level.WARNING, message);
    }


    public error(format: string, error?: Error, ...parameters: Parameter[]): Promise<void> {
        const message: Message = new Message(format, error, parameters);

        return this.log(Level.ERROR, message);
    }


    public fatal(format: string, error?: Error, ...parameters: Parameter[]): Promise<void> {
        const message: Message = new Message(format, error, parameters);

        return this.log(Level.FATAL, message);
    }


    private async log(level: Level, message: Message): Promise<void> {
        const event: DefaultLogEvent = new DefaultLogEvent(this, level, message);

        await Promise.all(this._configuration.appenders.toArray().map((appender) => {
            return appender.append(event);
        }));
    }
}
