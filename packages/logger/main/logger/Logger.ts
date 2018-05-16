import {Level} from '../level/Level';
import {Message} from '../message/Message';
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


    public trace(format: string): Promise<void> {
        const message: Message = new Message(format);

        return this.log(Level.TRACE, message);
    }


    public info(format: string): Promise<void> {
        const message: Message = new Message(format);

        return this.log(Level.INFO, message);
    }


    public debug(format: string): Promise<void> {
        const message: Message = new Message(format);

        return this.log(Level.DEBUG, message);
    }


    public warning(format: string): Promise<void> {
        const message: Message = new Message(format);

        return this.log(Level.WARNING, message);
    }


    public error(format: string, error?: Error): Promise<void> {
        const message: Message = new Message(format, error);

        return this.log(Level.ERROR, message);
    }


    public fatal(format: string, error?: Error): Promise<void> {
        const message: Message = new Message(format, error);

        return this.log(Level.FATAL, message);
    }


    private async log(level: Level, message: Message): Promise<void> {
        const event: DefaultLogEvent = new DefaultLogEvent(this.name, level, message);

        await Promise.all(this._configuration.appenders.toArray().map((appender) => {
            return appender.append(event);
        }));
    }
}
