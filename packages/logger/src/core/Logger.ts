import { Actions } from '@monument/store';
import { Level } from './Level';
import { LogEvent } from './LogEvent';

/**
 * Represents logger itself.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see LoggerManager.get
 */
export class Logger {

  /**
   * Gets logger name.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent.name
   */
  readonly name: string;

  constructor(private readonly actions: Actions, name: string) {
    this.name = name;
  }

  /**
   * Sends trace log event.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent
   * @see Level.TRACE
   */
  trace(message: string, markers: string[] = []) {
    this.actions.next(new LogEvent(this.name, Level.TRACE, message, undefined, markers));
  }

  /**
   * Sends debug log event.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent
   * @see Level.DEBUG
   */
  debug(message: string, markers: string[] = []) {
    this.actions.next(new LogEvent(this.name, Level.DEBUG, message, undefined, markers));
  }

  /**
   * Sends info log event.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent
   * @see Level.INFO
   */
  info(message: string, markers: string[] = []) {
    this.actions.next(new LogEvent(this.name, Level.INFO, message, undefined, markers));
  }

  /**
   * Sends warning log event.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent
   * @see Level.WARNING
   */
  warning(message: string, markers: string[] = []) {
    this.actions.next(new LogEvent(this.name, Level.WARNING, message, undefined, markers));
  }

  /**
   * Sends error log event.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent
   * @see Level.ERROR
   */
  error(message: string, markers?: string[]): void;
  error(error: Error, markers?: string[]): void;
  error(messageOrError: string | Error, markers: string[] = []): void {
    const message: string = typeof messageOrError === 'string' ? messageOrError : messageOrError.message;
    const error: Error = typeof messageOrError === 'string' ? new Error(messageOrError) : messageOrError;
    this.actions.next(new LogEvent(this.name, Level.ERROR, message, error, markers));
  }

  /**
   * Sends fatal log event.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent
   * @see Level.FATAL
   */
  fatal(message: string, markers?: string[]): void;
  fatal(error: Error, markers?: string[]): void;
  fatal(messageOrError: string | Error, markers: string[] = []) {
    const message: string = typeof messageOrError === 'string' ? messageOrError : messageOrError.message;
    const error: Error = typeof messageOrError === 'string' ? new Error(messageOrError) : messageOrError;
    this.actions.next(new LogEvent(this.name, Level.FATAL, message, error, markers));
  }
}
