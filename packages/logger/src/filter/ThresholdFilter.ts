import { LogEvent } from '../core/LogEvent';
import { Filter, Level } from '@monument/contracts';
import { FilterDecision } from './FilterDecision';

/**
 * Represents filter which filters log events by level threshold.
 * @see Filter
 * @see Transport.filters
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class ThresholdFilter implements Filter {
  /**
   * Threshold of log event level.
   * @see Level
   * @see LogEvent.level
   * @since 0.14.0
   * @author Alex Chugaev
   */
  readonly level: Level;

  /**
   * Initializes new instance.
   * @param level Log level threshold
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(level: Level) {
    this.level = level;
  }

  /**
   * Checks whether log event matches filter.
   * @since 0.14.0
   * @author Alex Chugaev
   */
  decide(event: LogEvent): FilterDecision {
    return event.level <= this.level ? FilterDecision.NEUTRAL : FilterDecision.DENY;
  }
}
