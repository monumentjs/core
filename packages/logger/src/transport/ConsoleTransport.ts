/* tslint:disable:no-console */
import { Transport } from './Transport';
import { Level } from '../core/Level';
import { LogEvent } from '../core/LogEvent';

export class ConsoleTransport extends Transport {
  protected send(action: LogEvent): void {
    const message = this.layout.serialize(action);

    switch (action.level) {
      case Level.FATAL:
        console.error(message);
        break;
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
