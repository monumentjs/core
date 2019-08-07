import { Filter } from './Filter';
import { LogEvent } from '../core/LogEvent';
import { MatchingFilter } from './MatchingFilter';
import { FilterDecision } from './FilterDecision';

/**
 * Represents filter which filters log events by logger name.
 * @see Filter
 * @see FilterDecision
 * @see Transport.filters
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class NameFilter extends MatchingFilter {
  /**
   * Target logger name.
   * @see LogEvent.logger
   * @see Logger.name
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly name: string;

  /**
   * Initializes new instance.
   * @param name Logger name
   * @param onMatch Filter decision made on match
   * @param onMismatch Filter decision made on mismatch
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(name: string, onMatch: FilterDecision, onMismatch: FilterDecision) {
    super(onMatch, onMismatch);
    this.name = name;
  }

  /**
   * Checks whether log event matches filter.
   * @since 0.14.0
   * @author Alex Chugaev
   */
  protected match(event: LogEvent): boolean {
    return event.logger === this.name;
  }
}
