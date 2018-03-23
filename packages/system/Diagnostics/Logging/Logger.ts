import {LogRecord} from './LogRecord';


export interface Logger {
    trace(record: LogRecord): void;
    debug(record: LogRecord): void;
    info(record: LogRecord): void;
    log(record: LogRecord): void;
    warning(record: LogRecord): void;
    error(record: LogRecord): void;
}
