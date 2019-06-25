import { LogEvent } from '../core/LogEvent';

/**
 * Represents layout for log event message serialization.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see Transport.layout
 */
export interface Layout {
  /**
   * Gets message header.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Layout.serialize
   */
  readonly header: string;

  /**
   * Gets message footer.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see Layout.serialize
   */
  readonly footer: string;

  /**
   * Serialize log action for further transporting.
   * @return Serialized log event message.
   * @since 0.0.1
   * @author Alex Chugaev
   * @see LogEvent.message
   * @see Layout.header
   * @see Layout.footer
   */
  serialize(action: LogEvent): string;
}
