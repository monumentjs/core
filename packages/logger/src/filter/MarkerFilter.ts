import { Filter } from './Filter';
import { LogEvent } from '../core/LogEvent';

/**
 * Represents filter which filters log events by marker.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see Filter
 * @see Transport.filters
 */
export class MarkerFilter implements Filter {
  /**
   * Marker to check in log event.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent.markers
   */
  readonly marker: string;

  constructor(marker: string, readonly onMatch = true, readonly onMismatch = false) { this.marker = marker; }

  filter(action: LogEvent): boolean {
    return action.markers.includes(this.marker) ? this.onMatch : this.onMismatch;
  }
}
