import { Disposable, LinkedMap, Map } from '@monument/core';
import { Actions } from '@monument/store';
import { LoggingConfiguration } from '../configuration/LoggingConfiguration';
import { TransportMediator } from '../transport/TransportMediator';
import { Logger } from './Logger';

/**
 * Represents logger manager. Logger manager caches loggers by name.
 * @see Logger
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class LoggerManager implements Disposable {
  private readonly _cache: Map<string, Logger> = new LinkedMap();
  private readonly _actions: Actions;
  private readonly _transportMediator: TransportMediator;

  /**
   * Initializes new instance.
   * @param actions Actions stream
   * @param configuration Logging configuration
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(actions: Actions, configuration: LoggingConfiguration) {
    this._actions = actions;
    this._transportMediator = new TransportMediator(actions, configuration.transports);
  }

  /**
   * Gets logger by name. If logger with such name already exists in cache, then cached instance will be returned.
   * @param name Logger name
   * @see Logger
   * @see Logger.name
   * @since 0.14.0
   * @author Alex Chugaev
   */
  get(name: string = ''): Logger {
    let logger: Logger | undefined = this._cache.get(name);

    if (logger == null) {
      logger = new Logger(this._actions, name);

      this._cache.put(logger.name, logger);
    }

    return logger;
  }

  dispose(): void {
    this._transportMediator.dispose();
  }
}
