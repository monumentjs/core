import { Filter } from './Filter';
import { LogEvent } from '../core/LogEvent';

/**
 * Represents filter which filters log events by logger name.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see Filter
 * @see Transport.filters
 * @see Logger.name
 */
export class NameFilter implements Filter {
  /**
   * Target logger name.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent.name
   * @see Logger.name
   */
  readonly name: string;

  constructor(name: string, readonly onMatch = true, readonly onMismatch = false) {
    this.name = name;
  }

  filter(event: LogEvent): boolean {
    return event.name === this.name ? this.onMatch : this.onMismatch;
  }
}
