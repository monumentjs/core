import { Action } from '@monument/store';
import { Level } from './Level';
import { LogEvent } from './LogEvent';

/**
 * Defines type of log action.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see LogAction.type
 */
export const LOG = 'Logger.LOG';

/**
 * Represents log action dispatched by logger usually to notify transports about log event.
 * @since 0.0.1
 * @author Alex Chugaev
 */
export class LogAction implements Action<LogEvent> {
  /**
   * Gets action type.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LOG
   */
  readonly type = LOG;

  readonly payload: LogEvent;

  constructor(name: string, level: Level, message: string, error: Error | undefined, markers: string[]) {
    this.payload = new LogEvent(name, level, message, error, markers);
  }
}
