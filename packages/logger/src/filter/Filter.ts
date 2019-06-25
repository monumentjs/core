import { LogEvent } from '../core/LogEvent';

/**
 * Represents log event filter.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see Transport.filters
 */
export interface Filter {
  /**
   * Gets value returned by filter method when log event match.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Filter.filter
   */
  readonly onMatch: boolean;

  /**
   * Gets value returned by filter method when log event mismatch.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Filter.filter
   */
  readonly onMismatch: boolean;

  /**
   * Checks whether log event matches filter.
   * @return onMatch value if log event matches filter, onMismatch value otherwise
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Filter.onMatch
   * @see Filter.onMismatch
   */
  filter(action: LogEvent): boolean;
}
