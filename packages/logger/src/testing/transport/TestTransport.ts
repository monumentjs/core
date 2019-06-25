import { LogEvent } from '../../core/LogEvent';
import { Transport } from '../../transport/Transport';

/**
 * Represents transport designed for testing purposes.
 * It records log events and serialized messages.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see Layout
 */
export class TestTransport extends Transport {
  readonly actions: LogEvent[] = [];
  readonly messages: string[] = [];

  protected send(action: LogEvent): void {
    this.actions.push(action);
    this.messages.push(this.layout.serialize(action));
  }
}
