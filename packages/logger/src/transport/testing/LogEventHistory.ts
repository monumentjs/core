import { LogEvent } from '../../core/LogEvent';
import { Filter } from '@monument/contracts';
import { TransportBase } from '../TransportBase';

/**
 * Represents transport designed for testing purposes.
 * It records log events and serialized messages.
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class LogEventHistory extends TransportBase {
  /**
   * Gets log event history.
   * @see LogEvent
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly events: LogEvent[] = [];

  /**
   * Initializes new instance.
   * @param filters Log event filters
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(filters?: ReadonlyArray<Filter>) {
    super(filters);
  }

  /**
   * Records next log event.
   * @param event Log event
   * @since 0.14.0
   * @author Alex Chugaev
   */
  protected send(event: LogEvent): void {
    this.events.push(event);
  }
}
