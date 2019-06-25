import { Filter } from './Filter';
import { Level } from '../core/Level';
import { LogEvent } from '../core/LogEvent';

/**
 * Represents filter which filters log events by level threshold.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see Filter
 * @see Transport.filters
 */
export class LevelFilter implements Filter {
  /**
   * Threshold of log event level.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Level
   * @see LogEvent.level
   */
  readonly threshold: Level;

  constructor(threshold: Level = Level.ALL, readonly onMatch = true, readonly onMismatch = false) {
    this.threshold = threshold;
  }

  filter(action: LogEvent): boolean {
    return action.level <= this.threshold;
  }
}
