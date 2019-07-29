import { LogEvent } from '../core/LogEvent';

/**
 * Represents layout for log event message serialization.
 * @see Transport.layout
 * @since 0.0.1
 * @author Alex Chugaev
 */
export interface Layout {
  /**
   * Gets message header.
   * @see Layout.serialize
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly header: string;

  /**
   * Gets message footer.
   * @see Layout.serialize
   * @since 0.0.1
   * @author Alex Chugaev
   */
  readonly footer: string;

  /**
   * Serialize log action for further transporting.
   * @return Serialized log event message.
   * @see LogAction.message
   * @see Layout.header
   * @see Layout.footer
   * @since 0.0.1
   * @author Alex Chugaev
   */
  serialize(event: LogEvent): string;
}
