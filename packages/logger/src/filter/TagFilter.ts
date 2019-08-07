import { LogEvent } from '../core/LogEvent';
import { Filter } from './Filter';
import { MatchingFilter } from './MatchingFilter';
import { FilterDecision } from './FilterDecision';

/**
 * Represents filter which filters log events by tag.
 * @see Filter
 * @see Transport.filters
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class TagFilter extends MatchingFilter {
  /**
   * Tag to check in log event.
   * @see LogEvent.tags
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly tag: string;

  /**
   * Initializes new instance.
   * @param tag Tag that event must contain
   * @param onMatch Filter decision made on match
   * @param onMismatch Filter decision made on mismatch
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(tag: string, onMatch: FilterDecision, onMismatch: FilterDecision) {
    super(onMatch, onMismatch);
    this.tag = tag;
  }

  /**
   * Checks whether log event matches filter.
   * @since 0.14.0
   * @author Alex Chugaev
   */
  protected match(event: LogEvent): boolean {
    return event.tags.includes(this.tag);
  }
}
