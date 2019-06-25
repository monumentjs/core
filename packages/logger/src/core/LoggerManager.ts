import { LinkedMap, Map } from '@monument/core';
import { Actions } from '@monument/store';
import { Logger } from './Logger';

/**
 * Represents logger manager. Logger manager caches loggers by name.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see Logger
 */
export class LoggerManager {
  private readonly loggers: Map<string, Logger> = new LinkedMap();

  constructor(private readonly actions: Actions) {}

  /**
   * Gets logger by name. If logger with such name already exists in cache, then cached instance will be returned.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Logger
   * @see Logger.name
   */
  get(name: string = ''): Logger {
    let logger = this.loggers.get(name);

    if (logger == null) {
      logger = new Logger(this.actions, name);

      this.loggers.put(name, logger);
    }

    return logger;
  }
}
