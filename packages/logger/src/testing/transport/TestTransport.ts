import { Transport } from '../../transport/Transport';
import { LogEvent } from '../../core/LogEvent';

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

  protected send(event: LogEvent): void {
    this.actions.push(event);
    this.messages.push(this.layout.serialize(event));
  }
}
