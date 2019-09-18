/* tslint:disable:no-console */
import { Level } from '../../core/Level';
import { LogEvent } from '../../core/LogEvent';
import {
  Filter,
  ConsoleLayout,
  Transport
} from '@monument/contracts';
import { TransportBase } from '../TransportBase';

/**
 * Represents console transport.
 * @see Console
 * @see Transport
 * @since 0.14.0
 * @author Alex Chugaev
 */
export class ConsoleTransport extends TransportBase {
  private readonly _layout: ConsoleLayout;

  /**
   * Initializes new instance.
   * @param layout Console message layout
   * @param filters List of log event filters
   * @since 0.14.0
   * @author Alex Chugaev
   */
  constructor(layout: ConsoleLayout, filters?: ReadonlyArray<Filter>) {
    super(filters);
    this._layout = layout;
  }

  /**
   * Writes log event to console.
   * @param event Log event
   * @since 0.14.0
   * @author Alex Chugaev
   */
  protected send(event: LogEvent): void {
    const message = this._layout.transform(event);

    switch (event.level) {
      case Level.ERROR:
        console.error(message);
        break;
      case Level.WARNING:
        console.warn(message);
        break;
      case Level.INFO:
        console.info(message);
        break;
      case Level.DEBUG:
        console.debug(message);
        break;
      case Level.TRACE:
        console.trace(message);
        break;
    }
  }
}
