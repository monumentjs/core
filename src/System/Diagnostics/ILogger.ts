import {ILogRecord} from './ILogRecord';


export interface ILogger {
    write(record: ILogRecord): void;
    writeLine(message: string): void;
    writeFormat(format: string, ...values: any[]): void;
}