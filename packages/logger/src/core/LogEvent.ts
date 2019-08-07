import { Level } from './Level';

/**
 * Represents log event dispatched by logger usually to notify transports about log event.
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class LogEvent {
  /**
   * Gets log event creation timestamp.
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly createdAt = new Date();

  /**
   * Gets logger name.
   * @see Logger.name
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly logger: string;

  /**
   * Gets level of log event.
   * @see Level
   * @see Logger.trace
   * @see Logger.debug
   * @see Logger.info
   * @see Logger.warning
   * @see Logger.error
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly level: Level;

  /**
   * Gets log event message.
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly message: string;

  /**
   * Gets error reported with error log events.
   * @see Logger.error
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly error: Error | undefined;

  /**
   * Gets tags of log event. Tags used to filter log events sending by transports.
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly tags: ReadonlyArray<string>;

  /**
   * Initializes new instance.
   * @param logger Logger name
   * @param level Log event level
   * @param message Log event message
   * @param error Log event error
   * @param tags Log event tags
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(logger: string, level: Level, message: string, error?: Error, tags: ReadonlyArray<string> = []) {
    this.logger = logger;
    this.level = level;
    this.message = message;
    this.error = error;
    this.tags = tags;
  }
}
