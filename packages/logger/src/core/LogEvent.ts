import { Level } from './Level';

/**
 * Represents log event dispatched by logger usually to notify transports about log event.
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class LogEvent {
  /**
   * Gets log event creation timestamp.
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly timestamp = Date.now();

  /**
   * Gets logger name.
   * @see Logger.name
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly name: string;

  /**
   * Gets error reported with error or fatal log events.
   * @see Logger.error
   * @see Logger.fatal
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly error: Error | undefined;

  /**
   * Gets level of log event.
   * @see Level
   * @see Logger.trace
   * @see Logger.debug
   * @see Logger.info
   * @see Logger.warning
   * @see Logger.error
   * @see Logger.fatal
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly level: Level;

  /**
   * Gets log event message.
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly message: string;

  /**
   * Gets log event markers. Markers used to filter log events sending by transports.
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly markers: string[];

  constructor(name: string, level: Level, message: string, error: Error | undefined, markers: string[]) {
    this.name = name;
    this.level = level;
    this.message = message;
    this.error = error;
    this.markers = markers;
  }
}
