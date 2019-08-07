import { LogEvent } from '../core/LogEvent';
import { Filter } from '../filter/Filter';

/**
 * Represents transport of log events. By it's nature `Transport` is an `Observer` of `LogEvent`s.
 * @see LogEvent
 * @see Filter
 * @see TransportMediator
 * @since 0.14.0
 * @author Alex Chugaev
 */
export interface Transport {
  /**
   * Sends log event using this transport.
   * @param event Log event
   * @since 0.14.0
   * @author Alex Chugaev
   */
  next(event: LogEvent): void;
}
