import { LogEvent } from '../core/LogEvent';
import { Filter } from '../filter/Filter';
import { FilterDecision } from '../filter/FilterDecision';
import { Transport } from './Transport';

/**
 * Represents base implementation of transport.
 * @since 0.14.0
 * @author Alex Chugaev
 */
export abstract class TransportBase implements Transport {
  /**
   * Gets log event filters.
   * @see LogEvent
   * @see Filter
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly filters: ReadonlyArray<Filter>;

  /**
   * Initializes new instance.
   * @param filters Log event filters
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(filters: ReadonlyArray<Filter> = []) {
    this.filters = filters;
  }

  /**
   * Sends log events which pass filters to underlying system.
   * @param event Log event
   * @see filters
   * @since 0.14.0
   * @author Alex Chugaev
   */
  next(event: LogEvent): void {
    for (const filter of this.filters) {
      const decision = filter.decide(event);

      if (decision === FilterDecision.DENY) {
        return;
      }

      if (decision === FilterDecision.ALLOW) {
        break;
      }
    }

    this.send(event);
  }

  /**
   * Sends log event to underlying system.
   * @param event Log event
   * @since 0.14.0
   * @author Alex Chugaev
   */
  protected abstract send(event: LogEvent): void;
}
