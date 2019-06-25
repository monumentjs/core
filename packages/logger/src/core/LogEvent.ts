import { Action } from '@monument/store';
import { Level } from './Level';

/**
 * Defines type of log action.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see LogEvent.type
 */
export const LOG_EVENT = '@monument.logger.LOG_EVENT';

/**
 * Represents log action dispatched by logger usually to notify transports about log event.
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class LogEvent implements Action {

  /**
   * Gets action type.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LOG_EVENT
   */
  readonly type = LOG_EVENT;

  /**
   * Gets log event creation timestamp.
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly timestamp = Date.now();

  /**
   * Gets logger name.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Logger.name
   */
  readonly name: string;

  /**
   * Gets error reported with error or fatal log events.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Logger.error
   * @see Logger.fatal
   */
  readonly error: Error | undefined;

  /**
   * Gets level of log event.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Level
   * @see Logger.trace
   * @see Logger.debug
   * @see Logger.info
   * @see Logger.warning
   * @see Logger.error
   * @see Logger.fatal
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
