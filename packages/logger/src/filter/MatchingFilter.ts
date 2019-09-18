import { LogEvent } from '../core/LogEvent';
import { Filter } from '@monument/contracts';
import { FilterDecision } from './FilterDecision';

/**
 * Represents base implementation of matching filter.
 * @since 0.14.0
 * @author Alex Chugaev
 */
export abstract class MatchingFilter implements Filter {
  /**
   * Gets value which defines how to interpret case when filter matched log event.
   * @see Filter.decide
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly onMatch: FilterDecision;

  /**
   * Gets value which defines how to interpret case when filter mismatched log event.
   * @see Filter.decide
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly onMismatch: FilterDecision;

  /**
   * Initializes new instance.
   * @param onMatch Filter decision made on match
   * @param onMismatch Filter decision made on mismatch
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(onMatch: FilterDecision, onMismatch: FilterDecision) {
    this.onMatch = onMatch;
    this.onMismatch = onMismatch;
  }

  /**
   * Makes decision on how to process log event.
   * @param event Log event
   * @return onMatch value if log event matches filter, onMismatch value otherwise
   * @see Filter.onMatch
   * @see Filter.onMismatch
   * @since 0.14.0
   * @author Alex Chugaev
   */
  decide(event: LogEvent): FilterDecision {
    return this.match(event) ? this.onMatch : this.onMismatch;
  }

  /**
   * Checks whether log event matches filter.
   * @see MatchingFilter.decide
   * @since 0.14.0
   * @author Alex Chugaev
   */
  protected abstract match(event: LogEvent): boolean;
}
