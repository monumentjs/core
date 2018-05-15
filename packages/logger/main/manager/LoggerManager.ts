import {ListMap} from '@monument/collections/main/ListMap';
import {Service} from '@monument/stereotype/main/Service';
import {Logger} from '../logger/Logger';
import {LoggerConfiguration} from '../logger/LoggerConfiguration';


@Service
export class LoggerManager {
    private readonly _loggers: ListMap<string, Logger> = new ListMap();
    private readonly _configuration: LoggerConfiguration;


    public constructor(configuration: LoggerConfiguration) {
        this._configuration = configuration;
    }


    public getLogger(name: string): Logger {
        let logger: Logger | undefined = this._loggers.get(name);

        if (logger == null) {
            logger = new Logger(name, this._configuration);

            this._loggers.put(name, logger);
        }

        return logger;
    }


    public hasLogger(name: string): boolean {
        return this._loggers.containsKey(name);
    }
}
