import { Actions } from '@monument/store';
import { Level } from '@monument/contracts';
import { LogAction } from './LogAction';

/**
 * Represents logger.
 * @see LoggerManager.get
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class Logger {
  private readonly _actions: Actions;

  /**
   * Gets logger name.
   * @see LogEvent.logger
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly name: string;

  /**
   * Initializes new instance.
   * @param actions Actions stream
   * @param name Logger name
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(actions: Actions, name: string) {
    this._actions = actions;
    this.name = name;
  }

  /**
   * Sends trace log event.
   * @param message Log event message
   * @param tags Log event tags
   * @see LogAction
   * @see Level.TRACE
   * @since 0.14.0
   * @author Alex Chugaev
   */
  trace(message: string, tags: ReadonlyArray<string> = []) {
    this._actions.next(new LogAction(this.name, Level.TRACE, message, undefined, tags));
  }

  /**
   * Sends debug log event.
   * @param message Log event message
   * @param tags Log event tags
   * @see LogAction
   * @see Level.DEBUG
   * @since 0.14.0
   * @author Alex Chugaev
   */
  debug(message: string, tags: ReadonlyArray<string> = []) {
    this._actions.next(new LogAction(this.name, Level.DEBUG, message, undefined, tags));
  }

  /**
   * Sends info log event.
   * @param message Log event message
   * @param tags Log event tags
   * @see LogAction
   * @see Level.INFO
   * @since 0.14.0
   * @author Alex Chugaev
   */
  info(message: string, tags: ReadonlyArray<string> = []) {
    this._actions.next(new LogAction(this.name, Level.INFO, message, undefined, tags));
  }

  /**
   * Sends warning log event.
   * @param message Log event message
   * @param tags Log event tags
   * @see LogAction
   * @see Level.WARNING
   * @since 0.14.0
   * @author Alex Chugaev
   */
  warning(message: string, tags: ReadonlyArray<string> = []) {
    this._actions.next(new LogAction(this.name, Level.WARNING, message, undefined, tags));
  }

  /**
   * Sends error log event.
   * @param message Log event message
   * @param tags Log event tags
   * @see LogAction
   * @see Level.ERROR
   * @since 0.14.0
   * @author Alex Chugaev
   */
  error(message: string, tags?: ReadonlyArray<string>): void;

  /**
   * Sends error log event.
   * @param error Error instance
   * @param tags Log event tags
   * @see LogAction
   * @see Level.ERROR
   * @since 0.14.0
   * @author Alex Chugaev
   */
  error(error: Error, tags?: ReadonlyArray<string>): void;

  /**
   * Sends error log event.
   * @param messageOrError Log event message or error instance
   * @param tags Log event tags
   * @see LogAction
   * @see Level.ERROR
   * @since 0.14.0
   * @author Alex Chugaev
   */
  error(messageOrError: string | Error, tags: ReadonlyArray<string> = []): void {
    const message: string = typeof messageOrError === 'string' ? messageOrError : messageOrError.message;
    const error: Error = typeof messageOrError === 'string' ? new Error(messageOrError) : messageOrError;
    this._actions.next(new LogAction(this.name, Level.ERROR, message, error, tags));
  }
}
