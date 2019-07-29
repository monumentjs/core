import { LinkedMap, Map } from '@monument/core';
import { Actions } from '@monument/store';
import { Logger } from './Logger';

/**
 * Represents logger manager. Logger manager caches loggers by name.
 * @see Logger
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class LoggerManager {
  private readonly cache: Map<string, Logger> = new LinkedMap();

  /**
   * Gets actions bus.
   * @since 0.0.1
   * @author Alex Chugaev
   */
  private readonly actions: Actions;

  /**
   * Creates new instance.
   * @since 0.0.1
   * @author Alex Chugaev
   */
  constructor(actions: Actions) {
    this.actions = actions;
  }

  /**
   * Gets logger by name. If logger with such name already exists in cache, then cached instance will be returned.
   * @see Logger
   * @see Logger.name
   * @since 0.0.1
   * @author Alex Chugaev
   */
  get(name: string = ''): Logger {
    let logger: Logger | undefined = this.cache.get(name);

    if (logger == null) {
      logger = new Logger(this.actions, name);

      this.cache.put(name, logger);
    }

    return logger;
  }
}
