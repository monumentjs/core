import { Action } from '@monument/store';
import { Level } from './Level';
import { LogEvent } from './LogEvent';

/**
 * Defines type of log action.
 * @since 0.14.0
 * @author Alex Chugaev
 * @see LogAction.type
 */
export const LOG = 'Logger.LOG';

/**
 * Represents log action dispatched by logger usually to notify transports about log event.
 * @see LogEvent
 * @see Logger
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class LogAction implements Action<LogEvent> {
  /**
   * Gets action type.
   * @see LOG
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly type = LOG;

  /**
   * Gets action payload (log event).
   * @see LogEvent
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly payload: LogEvent;

  /**
   * Initialized new instance.
   * @param name Logger name
   * @param level Log event level
   * @param message Log event message
   * @param error Error
   * @param tags Log event tags
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(name: string, level: Level, message: string, error: Error | undefined, tags: ReadonlyArray<string>) {
    this.payload = new LogEvent(name, level, message, error, tags);
  }
}
